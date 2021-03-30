import { PaymentCanceled, PaymentCreated } from '../events'
import { codeCreate } from '../helpers'
import {
  OfferDoc,
  OfficeDoc,
  PaymentDoc,
  PaymentModel,
  ProductDoc,
  SubscriptionDoc,
  UserDoc,
} from '../models'
import { SubscriptionService, UserOfficeService } from '.'

interface PaymentCreateData {
  user: UserDoc
  office: OfficeDoc
  items: Array<{
    subscription: SubscriptionDoc
    qty: number
  }>
}

export async function create(data: PaymentCreateData) {
  const {
    user,
    office,
    // office: { shop, city },
  } = data
  const shop = office.shop
  const city = office.city
  const items = data.items.map(prettifyPaymentItem)
  const code = codeCreate()

  const payment = await PaymentModel.create({
    user,
    shop,
    city,
    office,
    items,
    code,
  })

  for (const { subscription, qty } of data.items) {
    await SubscriptionService.changeBalance(subscription, -qty)
  }

  await UserOfficeService.update({ user, office })

  PaymentCreated.emit({ payment })

  return payment
}

export async function cancel(payment: PaymentDoc) {
  if (payment.canceledAt) return false

  payment.canceledAt = new Date()
  await payment.save()

  if (!payment.populated('subscription')) {
    void payment.populate('subscription').execPopulate()
  }

  for (const { subscription, qty } of payment.items) {
    await SubscriptionService.changeBalance(
      subscription as SubscriptionDoc,
      qty,
    )
  }

  PaymentCanceled.emit({ payment })

  return true
}

function prettifyPaymentItem(item: {
  subscription: SubscriptionDoc
  qty: number
}): {
  product: ProductDoc
  offer: OfferDoc
  subscription: SubscriptionDoc
  qty: number
} {
  return {
    product: item.subscription.product as ProductDoc,
    offer: item.subscription.offer as OfferDoc,
    subscription: item.subscription,
    qty: item.qty,
  }
}
