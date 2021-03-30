import mongoose from 'mongoose'
import createHttpError from 'http-errors'
import { Body, Controller, CurrentUser, Flow, Post } from 'koa-ts-controllers'
import { OfferModel, OfficeModel, UserDoc } from '../../app/models'
import { PurchaseService } from '../../app/services'
import { PurchaseCreateInput } from '../inputs/purchase'
import { auth } from '../middlewares/auth'
import { purchaseOutput } from '../outputs/purchase'

@Controller('/purchases')
export default class PurchaseController {
  @Post('/')
  @Flow([auth])
  async create(
    @Body({ required: true }) data: PurchaseCreateInput,
    @CurrentUser() user: UserDoc,
  ) {
    const createData = { user, items: [] }

    const offerIds = data.items.map(el => el.offer)
    const offers = await OfferModel.find({
      _id: { $in: offerIds.map(mongoose.Types.ObjectId) },
    })
      .populate('shop')
      .populate('product')

    if (offers.length !== offerIds.length) throw createHttpError(404)

    const officeIds = data.items
      .filter(value => !!value.office)
      .map(el => el.office)
    const offices = await OfficeModel.find({
      _id: { $in: officeIds.map(mongoose.Types.ObjectId) },
    })
      .populate('shop')
      .populate('user')
      .populate('city')

    if (offices.length !== officeIds.length) throw createHttpError(404)

    for (const item of data.items) {
      createData.items.push({
        offer: offers.find(el => el['_id'].toString() === item.offer),
        office: item.office
          ? offices.find(el => el['_id'].toString() === item.office)
          : undefined,
        qty: 1,
      })
    }

    const purchase = await PurchaseService.create(createData)

    return purchaseOutput(purchase)
  }
}
