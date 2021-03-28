import * as mongoose from 'mongoose'
import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { _id: false } })
export class CityField {
  @prop({ required: true, index: true })
  _id: mongoose.Types.ObjectId

  @prop({ required: true })
  name: string
}
