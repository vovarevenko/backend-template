import { UserDoc } from '../../app/models'
import { userOutput } from './user'

export function authOutput(user: UserDoc) {
  return {
    user: userOutput(user),
    token: user.token,
  }
}
