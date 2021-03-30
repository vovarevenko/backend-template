import mongoose from 'mongoose'
import { DocumentType, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { CityField } from './fields'
import { Shop } from './shop'
import { User } from './user'

export class Office {
  @prop()
  _id!: mongoose.Types.ObjectId

  @prop({ required: true, index: true, ref: Shop })
  shop!: Ref<Shop>

  @prop({ required: true, index: true, ref: User })
  user!: Ref<User>

  @prop({ required: true })
  city!: CityField

  @prop({ required: true })
  address!: string

  @prop()
  createdAt?: Date

  @prop()
  updatedAt?: Date

  lastTouch?: Date
}

export const OfficeModel = getModelForClass(Office, {
  schemaOptions: { timestamps: true },
})

export type OfficeDoc = DocumentType<Office>
