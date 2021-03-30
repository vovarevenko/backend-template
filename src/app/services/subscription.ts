import {
  OfferDoc,
  SubscriptionDoc,
  SubscriptionModel,
  UserDoc,
} from '../models'

interface SubscriptionCreateData {
  user: UserDoc
  offer: OfferDoc
}

export async function create(data: SubscriptionCreateData) {
  const { user, offer } = data

  if (!offer.populated('shop')) {
    offer.populate('shop')
  }

  if (!offer.populated('product')) {
    offer.populate('product')
  }

  await offer.execPopulate()

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + offer.validity)

  const subscription = await SubscriptionModel.create({
    user,
    shop: offer.shop,
    product: offer.product,
    offer,
    price: offer.price,
    qty: offer.qty,
    validity: offer.validity,
    balance: offer.qty,
    expiresAt,
  })

  return subscription
}

export async function changeBalance(
  subscription: SubscriptionDoc,
  change: number,
) {
  if (subscription.balance + change >= 0) {
    subscription.balance += change
    await subscription.save()
  }
}
