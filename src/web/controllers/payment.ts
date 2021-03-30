import mongoose from 'mongoose'
import { isDocument } from '@typegoose/typegoose'
import createHttpError from 'http-errors'
import {
  Body,
  Controller,
  CurrentUser,
  Flow,
  Get,
  Params,
  Post,
  Query,
} from 'koa-ts-controllers'
import {
  OfficeModel,
  PaymentModel,
  SubscriptionDoc,
  SubscriptionModel,
  UserDoc,
} from '../../app/models'
import { PaymentService } from '../../app/services'
import { PaymentCreateInput } from '../inputs/payment'
import { auth } from '../middlewares/auth'
import { paymentOutput } from '../outputs/payment'

@Controller('/payments')
export default class PaymentController {
  @Get('/')
  async list(
    @Query('user') user?: string,
    @Query('shop') shop?: string,
    @Query('office') office?: string,
  ) {
    const query = getPaymentQuery().sort({ createdAt: -1 })

    if (user) void query.where({ user })
    if (shop) void query.where({ shop })
    if (office) void query.where({ office })

    return (await query.exec()).map(paymentOutput)
  }

  @Post('/')
  @Flow([auth])
  async create(
    @Body({ required: true }) data: PaymentCreateInput,
    @CurrentUser() user: UserDoc,
  ) {
    const office = await OfficeModel.findById(data.office).populate('shop')
    if (!office) throw createHttpError(404)

    const createData = {
      user,
      office,
      items: [] as Array<{
        subscription: SubscriptionDoc
        qty: number
      }>,
    }

    const subscriptionIds = data.items.map(el => el.subscription)
    const subscriptions = await SubscriptionModel.find({
      _id: { $in: subscriptionIds.map(mongoose.Types.ObjectId) },
    })
      .populate('user')
      .populate('shop')
      .populate('product')
      .populate('offer')

    if (subscriptions.length !== subscriptionIds.length) {
      throw createHttpError(404)
    }

    const now = new Date()

    for (const item of data.items) {
      const subscription = subscriptions.find(
        el => el._id.toString() === item.subscription,
      )

      if (
        !isDocument(subscription) ||
        !isDocument(subscription?.user) ||
        subscription.user._id.toString() !== user._id.toString() ||
        // subscription.balance < item.qty ||
        subscription.expiresAt < now
      ) {
        throw createHttpError(403)
      }

      createData.items.push({
        subscription: subscriptions.find(
          el => el._id.toString() === item.subscription,
        ) as SubscriptionDoc,
        qty: 1,
      })
    }

    const payment = await PaymentService.create(createData)

    return paymentOutput(payment)
  }

  @Get('/:id')
  async item(@Params('id') id: string) {
    return await getPaymentByIdOrDie(id)
  }

  @Post('/:id')
  async cancel(@Params('id') id: string, @CurrentUser() user: UserDoc) {
    const payment = await getPaymentByIdOrDie(id)

    if (
      !isDocument(payment.shop) ||
      !isDocument(payment.shop.user) ||
      payment.shop.user._id.toString() !== user._id.toString()
    ) {
      throw createHttpError(403)
    }

    await PaymentService.cancel(payment)

    return paymentOutput(payment)
  }
}

async function getPaymentByIdOrDie(id: string) {
  const payment = await getPaymentQuery()
    .where('_id', mongoose.Types.ObjectId(id))
    .findOne()
    .exec()

  if (!payment) throw createHttpError(404)

  return payment
}

function getPaymentQuery() {
  return PaymentModel.find()
    .populate('user')
    .populate('shop')
    .populate('office')
    .populate('items')
}
