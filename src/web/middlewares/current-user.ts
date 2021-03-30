import { Context, Next } from 'koa'
import { jwtVerify } from '../../app/helpers'
import { UserModel } from '../../app/models'

export async function currentUser(ctx: Context, next: Next) {
  ctx.state.user = null

  const { authorization } = ctx.request.headers

  if (authorization) {
    const token = authorization.split(' ')[1]

    try {
      const { _id } = jwtVerify(token)
      const user = await UserModel.findById(_id)
      ctx.state.user = user
    } catch (e) {}
  }

  await next()
}
