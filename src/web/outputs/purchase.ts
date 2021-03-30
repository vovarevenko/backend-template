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
      : purchase.user?.toString(),
    items: purchase.items.map(item => ({
      shop: isDocument(item.shop)
        ? shopOutput(item.shop)
        : item.shop?.toString(),
      product: isDocument(item.product)
        ? productOutput(item.product)
        : item.product?.toString(),
      offer: isDocument(item.offer)
        ? offerOutput(item.offer)
        : item.offer?.toString(),
      subscription: isDocument(item.subscription)
        ? subscriptionOutput(item.subscription)
        : item.subscription?.toString(),
      city: item.city ? cityOutput(item.city) : undefined,
      office: isDocument(item.office)
        ? officeOutput(item.office)
        : item.office?.toString(),
      qty: item.qty,
    })),
    createdAt: purchase.createdAt,
    canceledAt: purchase.canceledAt,
  }
}
