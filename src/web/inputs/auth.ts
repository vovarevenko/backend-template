import { IsString } from 'class-validator'

export class LoginInput {
  @IsString()
  login: string

  @IsString()
  password: string
}

export class ChangeCityInput {
  @IsString()
  city: string
}
