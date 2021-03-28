import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose'

export class City {
  @prop({ required: true, index: true })
  name: string
}

export const CityModel = getModelForClass(City)

export type CityDoc = DocumentType<City>
