import { jwtSign } from '../helpers'
import { CityDoc, UserDoc, UserModel } from '../models'

interface UserCreateData {
  city: CityDoc
  name?: string
  googleId?: string
  telegramId?: number
}

export async function create(data: UserCreateData) {
  const user = new UserModel()

  user.token = jwtSign({ _id: user._id })
  user.city = {
    _id: data.city._id,
    name: data.city.name,
  }
  user.name = data.name

  user.googleId = data.googleId
  user.telegramId = data.telegramId

  await user.save()

  return user
}

export async function changeCity(user: UserDoc, city: CityDoc) {
  user.city = {
    _id: city._id,
    name: city.name,
  }

  if (user.isModified('city')) {
    await user.save()
  }
}
