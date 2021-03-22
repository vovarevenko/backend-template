import { UserDoc } from '../../app/models'
import { userOutput } from './user'

export function authOutput(
  user: UserDoc
): {
  user: Record<string, unknown>
  token: string
} {
  return {
    user: userOutput(user),
    token: user.token,
  }
}
