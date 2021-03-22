import { UserDoc } from '../../app/models'
import { cityOutput } from './city'

export function userOutput(user: UserDoc) {
  return {
    id: user._id.toString(),
    name: user.name,
    city: cityOutput(user.city),
    login: user.login,
    googleId: user.googleId,
    telegramId: user.telegramId,
    createdAt: user.createdAt,
  }
}
