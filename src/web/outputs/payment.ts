import { isDocument } from '@typegoose/typegoose'
import { PaymentDoc } from '../../app/models'
import { cityOutput } from './city'
import { offerOutput } from './offer'
import { officeOutput } from './office'
import { productOutput } from './product'
import { shopOutput } from './shop'
import { subscriptionOutput } from './subscription'
import { userOutput } from './user'

export function paymentOutput(payment: PaymentDoc) {
  return {
    id: payment._id.toString(),
    user: isDocument(payment.user)
      ? userOutput(payment.user)
      : payment.user['_id'].toString(),
    shop: isDocument(payment.shop)
      ? shopOutput(payment.shop)
      : payment.shop['_id'].toString(),
    city: cityOutput(payment.city),
    office: isDocument(payment.office)
      ? officeOutput(payment.office)
      : payment.office['_id'].toString(),
    items: payment.items.map(item => ({
      product: isDocument(item.product)
        ? productOutput(item.product)
        : item.product['_id'].toString(),
      offer: isDocument(item.offer)
        ? offerOutput(item.offer)
        : item.offer['_id'].toString(),
      subscription: isDocument(item.subscription)
        ? subscriptionOutput(item.subscription)
        : item.subscription['_id'].toString(),
      qty: item.qty,
    })),
    code: payment.code,
    createdAt: payment.createdAt,
    canceledAt: payment.canceledAt,
  }
}
