import {
  SubscriptionService,
  UserOfficeService,
} from '.'
import {
  OfferDoc,
  OfficeDoc,
  ProductDoc,
  PurchaseModel,
  ShopDoc,
  SubscriptionDoc,
  UserDoc,
} from '../models'
import { CityField } from '../models/fields'

interface PurchaseCreateData {
  user: UserDoc
  items: Array<{
    offer: OfferDoc
    office?: OfficeDoc
    qty: number
  }>
}

export async function create(data: PurchaseCreateData) {
  const { user } = data

  const items = await Promise.all(
    data.items.map(async ({ offer, office, qty }) => {
      const subscription = await SubscriptionService.create({ user, offer })
      return prettifyPurchaseItem({ offer, subscription, office, qty })
    })
  )

  const purchase = await PurchaseModel.create({ user, items })

  for (const { office } of purchase.items) {
    if (office) {
      await UserOfficeService.update({ user, office: office as OfficeDoc })
    }
  }

  return purchase
}

function prettifyPurchaseItem(
  item: {
    offer: OfferDoc,
    subscription: SubscriptionDoc
    office?: OfficeDoc,
    qty: number,
  }
): {
  shop: ShopDoc
  product: ProductDoc
  offer: OfferDoc
  subscription: SubscriptionDoc
  city?: CityField
  office?: OfficeDoc
  qty: number
} {
  return {
    shop: item.offer.shop as ShopDoc,
    product: item.offer.product as ProductDoc,
    offer: item.offer,
    subscription: item.subscription,
    city: item.office ? item.office.city : undefined,
    office: item.office,
    qty: item.qty,
  }
}
