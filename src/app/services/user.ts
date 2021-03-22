import { hash, genSalt } from 'bcrypt'
import { jwtSign } from '../helpers'
import { CityDoc, UserDoc, UserModel } from '../models'

interface UserCreateData {
  city: CityDoc
  name?: string
  login?: string
  password?: string
  googleId?: string
  telegramId?: number
}

export async function create(data: UserCreateData) {
  const user = new UserModel()

  user.token = await jwtSign({ _id: user._id })
  user.city = {
    _id: data.city._id,
    name: data.city.name,
  }
  user.name = data.name

  if (data.login && data.password) {
    user.login = data.login
    user.password = await hash(data.password, await genSalt(10))
  }

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

export async function changePassword(user: UserDoc, password: string) {
  user.password = await hash(password, await genSalt(10))
  await user.save()
}
