import {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose'
import { CityField } from './fields'
import { Offer } from './offer'
import { Office } from './office'
import { Product } from './product'
import { Shop } from './shop'
import { Subscription } from './subscription'
import { User } from './user'

@modelOptions({ schemaOptions: { _id: false } })
export class PurchaseItem {

  @prop({ required: true, index: true, ref: Shop })
  shop: Ref<Shop>

  @prop({ required: true, index: true, ref: Product })
  product: Ref<Product>

  @prop({ required: true, index: true, ref: Offer })
  offer: Ref<Offer>

  @prop({ required: true, index: true, ref: Subscription })
  subscription: Ref<Subscription>

  @prop({ type: CityField })
  city?: CityField

  @prop({ index: true, ref: Office })
  office?: Ref<Office>

  @prop({ required: true, min: 1 })
  qty: number

}

export class Purchase {

  @prop({ required: true, index: true, ref: User })
  user: Ref<User>

  @prop({ required: true, type: PurchaseItem })
  items: PurchaseItem[]

  @prop()
  createdAt?: Date

  @prop()
  updatedAt?: Date

  @prop()
  canceledAt?: Date

}

export const PurchaseModel = getModelForClass(Purchase, {
  schemaOptions: { timestamps: true },
})

export type PurchaseDoc = DocumentType<Purchase>
