import {
  googleGetTokenInfo,
  telegramCheckAuth,
  TelegramLoginData,
} from '../helpers'
import { CityDoc, UserDoc, UserModel } from '../models'
import { UserService } from '.'

export async function loginWithGoogle(
  token: string,
  city: CityDoc,
  user?: UserDoc
) {
  const { name, email: googleId } = await googleGetTokenInfo(token)

  if (user) {
    user.googleId = googleId

    if (user.isModified()) {
      await user.save()
    }

    return user
  }

  user = await UserModel.findOne({ googleId })

  if (!user) {
    user = await UserService.create({ city, name, googleId })
  } else {
    user.name = name
    user.googleId = googleId

    if (user.isModified()) {
      await user.save()
    }
  }

  return user
}

export async function loginWithTelegram(
  data: TelegramLoginData,
  city: CityDoc,
  user?: UserDoc
) {
  if (!telegramCheckAuth(data)) {
    throw new Error()
  }

  const { id: telegramId, first_name, last_name } = data
  const name = last_name ? `${first_name} ${last_name}` : first_name

  if (user) {
    user.telegramId = telegramId
    if (user.isModified()) await user.save()
    return user
  }

  user = await UserModel.findOne({ telegramId })

  if (!user) {
    user = await UserService.create({ city, name, telegramId })
  } else {
    user.name = name
    user.telegramId = telegramId

    if (user.isModified()) {
      await user.save()
    }
  }

  return user
}
