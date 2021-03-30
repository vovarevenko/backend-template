/**
 * First of all, init the config
 */
import { isDev, eventListeners, mongo as mongoConfig } from './config'

import { readdirSync } from 'fs'

import mongoose from 'mongoose'
import { CityModel } from './app/models'
import { FakeDataService } from './app/services'

void bootstrap()

async function bootstrap() {
  /**
   * Connect to database
   */
  await dbConnect()

  /**
   * Create fake data
   */
  if (isDev) {
    await createFakeData()
  }

  /**
   * Require event listeners
   */
  requireListeners(eventListeners)
}

async function dbConnect() {
  mongoose.set('debug', mongoConfig.debug)

  await mongoose.connect(mongoConfig.uris, {
    dbName: mongoConfig.dbName,
    user: mongoConfig.username,
    pass: mongoConfig.password,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

async function createFakeData() {
  if (!(await CityModel.estimatedDocumentCount())) {
    await FakeDataService.createFakeData()
  }
}

function requireListeners(paths: string[]) {
  paths.forEach(path => {
    readdirSync(path).forEach(file => {
      require(`${path}/${file}`)
    })
  })
}
