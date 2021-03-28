import * as mongoose from 'mongoose'
import * as createHttpError from 'http-errors'
import { Controller, Get, Params, Query } from 'koa-ts-controllers'
import { ShopModel } from '../../app/models'
import { shopOutput } from '../outputs/shop'

@Controller('/shops')
export default class ShopController {
  @Get('/')
  async list(@Query('city') city?: string) {
    const query = ShopModel.find().sort({ _id: 1 })

    if (city) query.where({ 'cities._id': mongoose.Types.ObjectId(city) })

    return (await query.exec()).map(shopOutput)
  }

  @Get('/:id')
  async item(@Params('id') id: string) {
    const shop = await ShopModel.findById(id).populate('cities')

    if (!shop) throw createHttpError(404)

    return shopOutput(shop)
  }
}
