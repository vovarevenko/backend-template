import mongoose from 'mongoose'
import createHttpError from 'http-errors'
import { Controller, Get, Params, Query } from 'koa-ts-controllers'
import { OfferModel } from '../../app/models'
import { offerOutput } from '../outputs/offer'

@Controller('/offers')
export default class OfferController {
  @Get('/')
  async list(
    @Query('shop') shop?: string,
    @Query('city') city?: string,
    @Query('office') office?: string,
  ) {
    const query = OfferModel.find().sort({ _id: 1 })

    if (shop) void query.where({ shop })
    if (city) void query.where({ 'cities._id': mongoose.Types.ObjectId(city) })
    if (office)
      void query.where({
        $or: [{ offices: [] }, { offices: office }],
      })

    void query.populate('shop')
    void query.populate('product')
    void query.populate('offices')

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
