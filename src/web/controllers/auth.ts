import createHttpError from 'http-errors'
import {
  Body,
  Controller,
  CurrentUser,
  Flow,
  Get,
  Put,
} from 'koa-ts-controllers'
import { CityModel, UserDoc } from '../../app/models'
import { UserService } from '../../app/services'
import { ChangeCityInput } from '../inputs/auth'
import { auth } from '../middlewares/auth'
import { cityOutput } from '../outputs/city'
import { userOutput } from '../outputs/user'

@Controller('/auth')
export default class AuthController {
  @Get('/user')
  @Flow([auth])
  user(@CurrentUser() user: UserDoc) {
    return userOutput(user)
  }

  @Put('/change-city')
  @Flow([auth])
  async changeCity(
    @Body({ required: true }) data: ChangeCityInput,
    @CurrentUser() user: UserDoc,
  ) {
    const city = await CityModel.findById(data.city)
    if (!city) throw createHttpError(404)

    await UserService.changeCity(user, city)

    return cityOutput(city)
  }
}
