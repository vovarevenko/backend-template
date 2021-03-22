import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
} from '@typegoose/typegoose'
import { Shop } from './shop'

export class Product {

  @prop({ required: true, index: true, ref: Shop })
  shop: Ref<Shop>

  @prop({ required: true })
  name: string

  @prop()
  weight?: number

  @prop()
  photo?: string

  @prop()
  desc?: string

  @prop()
  createdAt?: Date

  @prop()
  updatedAt?: Date

}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true },
})

export type ProductDoc = DocumentType<Product>
