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
export class PaymentItem {

  @prop({ required: true, index: true, ref: Product })
  product: Ref<Product>

  @prop({ required: true, index: true, ref: Offer })
  offer: Ref<Offer>

  @prop({ required: true, index: true, ref: Subscription })
  subscription: Ref<Subscription>

  @prop({ required: true, min: 1 })
  qty: number

}

export class Payment {

  @prop({ required: true, index: true, ref: User })
  user: Ref<User>

  @prop({ required: true, index: true, ref: Shop })
  shop: Ref<Shop>

  @prop({ required: true })
  city: CityField

  @prop({ required: true, index: true, ref: Office })
  office: Ref<Office>

  @prop({ required: true, type: PaymentItem })
  items: PaymentItem[]

  @prop({ required: true })
  code: string

  @prop()
  createdAt?: Date

  @prop()
  canceledAt?: Date

}

export const PaymentModel = getModelForClass(Payment, {
  schemaOptions: { timestamps: { updatedAt: false } },
})

export type PaymentDoc = DocumentType<Payment>
