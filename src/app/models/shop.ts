import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
} from '@typegoose/typegoose'
import { CityField } from './fields'
import { User } from './user'

export class Shop {

  @prop({ required: true, index: true, ref: User })
  user: Ref<User>

  @prop({ required: true })
  name: string

  @prop()
  cover?: string

  @prop({ type: CityField })
  cities?: CityField[]

  @prop()
  createdAt?: Date

  @prop()
  updatedAt?: Date

}

export const ShopModel = getModelForClass(Shop, {
  schemaOptions: { timestamps: true },
})

export type ShopDoc = DocumentType<Shop>
