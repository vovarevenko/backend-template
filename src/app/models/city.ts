import mongoose from 'mongoose'
import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose'

export class City {
  @prop()
  _id!: mongoose.Types.ObjectId

  @prop({ required: true, index: true })
  name!: string
}

export const CityModel = getModelForClass(City)

export type CityDoc = DocumentType<City>
