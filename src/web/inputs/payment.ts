import {
  IsString,
  ValidateNested,
} from 'class-validator'

class PaymentCreateItemsInput {
  @IsString()
  subscription: string
}

export class PaymentCreateInput {
  @IsString()
  office: string

  @ValidateNested()
  items: PaymentCreateItemsInput[]
}
