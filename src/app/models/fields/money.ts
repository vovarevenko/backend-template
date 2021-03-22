import { modelOptions, prop } from '@typegoose/typegoose'
import { Currency } from '../../../app/helpers'

@modelOptions({ schemaOptions: { _id: false } })
export class MoneyField {

  @prop({ required: true, enum: Currency })
  currency: Currency

  @prop({ required: true })
  value: number

}
