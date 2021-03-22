import * as jwt from 'jsonwebtoken'
import { jwt as cfg } from '../../config'

interface JwtPayload {
  _id: string
  iat?: number
}

export function jwtSign(payload: JwtPayload) {
  return jwt.sign(payload, cfg.secret)
}

export function jwtVerify(token: string) {
  return jwt.verify(token, cfg.secret) as JwtPayload
}
