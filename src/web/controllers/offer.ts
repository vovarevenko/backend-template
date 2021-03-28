import * as mongoose from 'mongoose'
import * as createHttpError from 'http-errors'
import { Controller, Get, Params, Query } from 'koa-ts-controllers'
import { OfferModel } from '../../app/models'
import { offerOutput } from '../outputs/offer'

@Controller('/offers')
export default class OfferController {
  @Get('/')
  async list(
    @Query('shop') shop?: string,
    @Query('city') city?: string,
    @Query('office') office?: string
  ) {
    const query = OfferModel.find().sort({ _id: 1 })

    if (shop) query.where({ shop })
    if (city) query.where({ 'cities._id': mongoose.Types.ObjectId(city) })
    if (office)
      query.where({
        $or: [{ offices: [] }, { offices: office }],
      })

    query.populate('shop')
    query.populate('product')
    query.populate('offices')

    return (await query.exec()).map(offerOutput)
  }

  @Get('/:id')
  async item(@Params('id') id: string) {
    const offer = await OfferModel.findById(id)
      .populate('shop')
      .populate('product')
      .populate('offices')

    if (!offer) throw createHttpError(404)

    return offerOutput(offer)
  }
}
