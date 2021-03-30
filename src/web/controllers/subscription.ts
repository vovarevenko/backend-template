import createHttpError from 'http-errors'
import {
  Controller,
  CurrentUser,
  Flow,
  Get,
  Params,
  Query,
} from 'koa-ts-controllers'
import { SubscriptionModel, UserDoc } from '../../app/models'
import { auth } from '../middlewares/auth'
import { subscriptionOutput } from '../outputs/subscription'

@Controller('/subscriptions')
export default class SubscriptionController {
  @Get('/')
  @Flow([auth])
  async list(
    @CurrentUser() currentUser: UserDoc,
    @Query('user') user: string,
    @Query('shop') shop?: string,
    @Query('product') product?: string,
    @Query('offer') offer?: string,
  ) {
    const query = SubscriptionModel.find()
      .sort({ updatedAt: -1 })
      .populate('shop')
      .populate({
        path: 'offer',
        populate: [{ path: 'product' }, { path: 'offices' }],
      })

    if (!user) throw createHttpError(403)
    if (currentUser && user !== currentUser['_id'].toString()) {
      throw createHttpError(403)
    }

    void query.where({ user })

    if (shop) void query.where({ shop })
    if (product) void query.where({ product })
    if (offer) void query.where({ offer })

    return (await query.exec()).map(subscriptionOutput)
  }

  @Get('/:id')
  async item(@Params('id') id: string) {
    const subscription = await SubscriptionModel.findById(id)
      .populate('shop')
      .populate({
        path: 'offer',
        populate: [{ path: 'product' }, { path: 'offices' }],
      })

    if (!subscription) throw createHttpError(404)

    return subscriptionOutput(subscription)
  }
}
