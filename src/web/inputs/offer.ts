import { IsNumber, IsPositive, IsString } from 'class-validator'

export class OfferCreateInput {
  @IsString()
  shop: string

  @IsString()
  name: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsNumber()
  @IsPositive()
  oldPrice: number

  @IsNumber()
  @IsPositive()
  qty: number
}

export class OfferUpdateInput {
  @IsString()
  name: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsNumber()
  @IsPositive()
  oldPrice: number

  @IsNumber()
  @IsPositive()
  qty: number
}
