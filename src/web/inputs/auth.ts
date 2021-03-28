import { IsString } from 'class-validator'

export class ChangeCityInput {
  @IsString()
  city: string
}
