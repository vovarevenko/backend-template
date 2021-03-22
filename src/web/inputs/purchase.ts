import {
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

class PurchaseCreateItemsInput {
  @IsString()
  offer: string

  @IsOptional()
  @IsString()
  office?: string
}

export class PurchaseCreateInput {
  @ValidateNested()
  items: PurchaseCreateItemsInput[]
}
