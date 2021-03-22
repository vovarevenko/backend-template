import * as http from 'http'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'
import { bootstrapControllers } from 'koa-ts-controllers'
// import { isHttpError } from 'http-errors'
import { currentUser } from './middlewares/current-user'

export const webApp = new Koa()
export const httpServer = http.createServer(webApp.callback())

const router = new Router()

bootstrapControllers(webApp, {
  router,
  basePath: '/',
  controllers: [`${__dirname}/controllers/*`],
  disableVersioning: true,
  flow: [currentUser],
})

webApp.use(cors())
webApp.use(bodyParser())
webApp.use(router.routes())
webApp.use(router.allowedMethods())
