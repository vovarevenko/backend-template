import hex from 'crypto-js/enc-hex'
import hmacSha256 from 'crypto-js/hmac-sha256'
import sha256 from 'crypto-js/sha256'
import { telegram as cfg } from '../../config'

export interface TelegramLoginData {
  [key: string]: string | number | undefined

  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export function telegramCheckAuth(data: TelegramLoginData) {
  const { hash, ...fields } = data
  const check = hex.stringify(
    hmacSha256(
      Object.keys(fields)
        .map((key: keyof TelegramLoginData) => `${key}=${fields[key] ?? ''}`)
        .sort()
        .join('\n'),
      sha256(cfg.botToken),
    ),
  )

  return check === hash
}
