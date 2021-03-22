import {
  IsString,
} from 'class-validator'

export class SubscriptionCreateInput {
  @IsString()
  user: string

  @IsString()
  offer: string
}
