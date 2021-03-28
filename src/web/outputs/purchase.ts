import { isDocument } from '@typegoose/typegoose'
import { PurchaseDoc } from '../../app/models'
import { cityOutput } from './city'
import { offerOutput } from './offer'
import { officeOutput } from './office'
import { productOutput } from './product'
import { shopOutput } from './shop'
import { subscriptionOutput } from './subscription'
import { userOutput } from './user'

export function purchaseOutput(purchase: PurchaseDoc) {
  return {
    id: purchase._id.toString(),
    user: isDocument(purchase.user)
      ? userOutput(purchase.user)
      : purchase.user['_id'].toString(),
    items: purchase.items.map(item => ({
      shop: isDocument(item.shop)
        ? shopOutput(item.shop)
        : item.shop['_id'].toString(),
      product: isDocument(item.product)
        ? productOutput(item.product)
        : item.product['_id'].toString(),
      offer: isDocument(item.offer)
        ? offerOutput(item.offer)
        : item.offer['_id'].toString(),
      subscription: isDocument(item.subscription)
        ? subscriptionOutput(item.subscription)
        : item.subscription['_id'].toString(),
      city: item.city ? cityOutput(item.city) : undefined,
      office: item.office
        ? isDocument(item.office)
          ? officeOutput(item.office)
          : item.office['_id'].toString()
        : undefined,
      qty: item.qty,
    })),
    createdAt: purchase.createdAt,
    canceledAt: purchase.canceledAt,
  }
}
