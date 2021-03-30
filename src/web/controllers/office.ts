import mongoose from 'mongoose'
import createHttpError from 'http-errors'
import { Controller, Get, Params, Query } from 'koa-ts-controllers'
import { OfficeDoc, OfficeModel, UserOfficeModel } from '../../app/models'
import { officeOutput } from '../outputs/office'

@Controller('/offices')
export default class OfficeController {
  @Get('/')
  async list(
    @Query('shop') shop?: string,
    @Query('city') city?: string,
    @Query('user') user?: string, // for sort by usage
  ) {
    const filters = {}
    if (shop) filters['shop'] = mongoose.Types.ObjectId(shop)
    if (city) filters['city._id'] = mongoose.Types.ObjectId(city)

    if (!user) {
      const query = OfficeModel.find(filters).sort({ _id: 1 }).populate('shop')

      return (await query.exec()).map(officeOutput)
    }

    const offices: OfficeDoc[] = await OfficeModel.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: UserOfficeModel.collection.name,
          let: { officeId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { user: mongoose.Types.ObjectId(user) },
                    { $eq: ['$office', '$$officeId'] },
                  ],
                },
              },
            },
            { $project: { _id: 0, updatedAt: 1 } },
          ],
          as: 'history',
        },
      },
      { $unwind: { path: '$history', preserveNullAndEmptyArrays: true } },
      { $sort: { 'history.updatedAt': -1, _id: 1 } },
      { $addFields: { lastTouch: '$history.updatedAt' } },
      { $project: { 'history.updatedAt': 0 } },
    ])

    await OfficeModel.populate(offices, { path: 'shop' })

    return offices.map(officeOutput)
  }

  @Get('/:id')
  async item(@Params('id') id: string) {
    const office = await OfficeModel.findById(id).populate('shop')

    if (!office) throw createHttpError(404)

    return officeOutput(office)
  }
}
