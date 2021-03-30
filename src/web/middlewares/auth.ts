import createHttpError from 'http-errors'
import { Context, Next } from 'koa'

export function auth(ctx: Context, next: Next) {
  if (!ctx.state.user) {
    throw createHttpError(401)
  }

  return next()
}
