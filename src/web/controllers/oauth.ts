import * as createHttpError from 'http-errors'
import { Body, Controller, CurrentUser, Post } from 'koa-ts-controllers'
import { CityModel, UserDoc } from '../../app/models'
import { OAuthService } from '../../app/services'
import { LoginGoogleInput, LoginTelegramInput } from '../inputs/oauth'
import { authOutput } from '../outputs/auth'

@Controller('/oauth')
export default class OAuthController {

  @Post('/login-google')
  async loginGoogle(
    @Body({ required: true }) { token, city }: LoginGoogleInput,
    @CurrentUser() user: UserDoc,
  ) {
    const cityDoc = await CityModel.findById(city)
    if (!cityDoc) throw createHttpError(404)

    user = await OAuthService.loginWithGoogle(token, cityDoc, user)

    return authOutput(user)
  }

  @Post('/login-telegram')
  async loginTelegram(
    @Body({ required: true }) data: LoginTelegramInput,
    @CurrentUser() user: UserDoc,
  ) {
    const { city, ...telegramData } = data

    const cityDoc = await CityModel.findById(city)
    if (!cityDoc) throw createHttpError(404)

    user = await OAuthService.loginWithTelegram(telegramData, cityDoc, user)

    return authOutput(user)
  }

}
