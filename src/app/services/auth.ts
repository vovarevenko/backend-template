import { compareSync } from 'bcrypt'
import { generate } from 'generate-password'
import { CityDoc, UserDoc, UserModel } from '../models'
import { UserService } from '.'

export async function registerPartner(login: string, city: CityDoc) {
  const password = generate({ length: 6, numbers: true })

  const user = await UserService.create({ city, login, password })

  return { user, password }
}

export async function resetPartnerPassword(user: UserDoc) {
  const password = generate({ length: 6, numbers: true })

  await UserService.changePassword(user, password)

  return { user, password }
}

export async function loginWithPassword(login: string, password: string) {
  const user = await UserModel.findOne({ login })

  if (!user) {
    throw new Error('User not found')
  }

  if (!compareSync(password, user.password)) {
    throw new Error('Wrong password')
  }

  return user
}
