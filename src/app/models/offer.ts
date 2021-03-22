import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
} from '@typegoose/typegoose'
import { CityField, MoneyField } from './fields'
import { Office } from './office'
import { Product } from './product'
import { Shop } from './shop'

export class Offer {

  @prop({ required: true, index: true, ref: Shop })
  shop: Ref<Shop>

  @prop({ required: true, index: true, ref: Product })
  product: Ref<Product>

  @prop({ required: true })
  price: MoneyField

  @prop({ required: true })
  oldPrice: MoneyField

  @prop({ required: true, min: 1 })
  qty: number

  @prop({ required: true, min: 1 })
  validity: number // days

  @prop({ type: CityField })
  cities?: CityField[]

  @prop({ index: true, ref: Office })
  offices?: Ref<Office>[]

  @prop()
  createdAt?: Date

  @prop()
  updatedAt?: Date

}

export const OfferModel = getModelForClass(Offer, {
  schemaOptions: { timestamps: true },
})

export type OfferDoc = DocumentType<Offer>
