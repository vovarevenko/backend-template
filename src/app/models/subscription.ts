import mongoose from 'mongoose'
import { DocumentType, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { MoneyField } from './fields'
import { Offer } from './offer'
import { Product } from './product'
import { Shop } from './shop'
import { User } from './user'

export class Subscription {
  @prop()
  _id!: mongoose.Types.ObjectId

  @prop({ required: true, index: true, ref: User })
  user!: Ref<User>

  @prop({ required: true, index: true, ref: Shop })
  shop!: Ref<Shop>

  @prop({ required: true, index: true, ref: Product })
  product!: Ref<Product>

  @prop({ required: true, index: true, ref: Offer })
  offer!: Ref<Offer>

  @prop({ required: true })
  price!: MoneyField

  @prop({ required: true, min: 1 })
  qty!: number

  @prop({ required: true, min: 1 })
  validity!: number // days

  @prop({ required: true, min: 0 })
  balance!: number

  @prop({ required: true })
  expiresAt!: Date

  @prop()
  createdAt?: Date

  @prop({ index: true })
  updatedAt?: Date
}

export const SubscriptionModel = getModelForClass(Subscription, {
  schemaOptions: { timestamps: true },
})

export type SubscriptionDoc = DocumentType<Subscription>
