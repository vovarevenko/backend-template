import {
  DocumentType,
  getModelForClass,
  index,
  prop,
  Ref,
} from '@typegoose/typegoose'
import { Office } from './office'
import { User } from './user'

@index({ user: 1, office: 1 }, { unique: true })
export class UserOffice {
  @prop({ required: true, ref: User })
  user: Ref<User>

  @prop({ required: true, ref: Office })
  office: Ref<Office>

  @prop()
  createdAt?: Date

  @prop({ index: true })
  updatedAt?: Date
}

export const UserOfficeModel = getModelForClass(UserOffice, {
  schemaOptions: { timestamps: true },
})

export type UserOfficeDoc = DocumentType<UserOffice>
