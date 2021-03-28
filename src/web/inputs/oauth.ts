import { IsNumber, IsOptional, IsString } from 'class-validator'

export class LoginGoogleInput {
  @IsString()
  token: string

  @IsString()
  city: string
}

export class LoginTelegramInput {
  @IsNumber()
  id: number

  @IsString()
  first_name: string

  @IsOptional()
  @IsString()
  last_name?: string

  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  photo_url?: string

  @IsNumber()
  auth_date: number

  @IsString()
  hash: string

  @IsString()
  city: string
}
