import {
  DocumentType,
  getModelForClass,
  index,
  prop,
} from '@typegoose/typegoose'
import { CityField } from './fields'

@index({ googleId: 1 }, {
  unique: true,
  partialFilterExpression: { googleId: { $exists: true } },
})
@index({ telegramId: 1 }, {
  unique: true,
  partialFilterExpression: { telegramId: { $exists: true } },
})
export class User {

  @prop({ required: true, unique: true })
  token: string

  @prop({ required: true })
  city: CityField

  @prop()
  name?: string

  @prop()
  googleId?: string

  @prop()
  telegramId?: number

  @prop()
  createdAt?: Date

  @prop()
  updatedAt?: Date

}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

export type UserDoc = DocumentType<User>
