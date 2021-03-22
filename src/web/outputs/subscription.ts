import { isDocument } from '@typegoose/typegoose'
import { SubscriptionDoc } from '../../app/models'
import { offerOutput } from './offer'
import { productOutput } from './product'
import { shopOutput } from './shop'
import { userOutput } from './user'

export function subscriptionOutput(subscription: SubscriptionDoc) {
  return {
    id: subscription._id.toString(),
    user: isDocument(subscription.user)
      ? userOutput(subscription.user)
      : subscription.user['_id'].toString(),
    shop: isDocument(subscription.shop)
      ? shopOutput(subscription.shop)
      : subscription.shop['_id'].toString(),
    product: isDocument(subscription.product)
      ? productOutput(subscription.product)
      : subscription.product['_id'].toString(),
    offer: isDocument(subscription.offer)
      ? offerOutput(subscription.offer)
      : subscription.offer['_id'].toString(),
    price: subscription.price,
    qty: subscription.qty,
    validity: subscription.validity,
    balance: subscription.balance,
    expiresAt: subscription.expiresAt,
    createdAt: subscription.createdAt,
  }
}
