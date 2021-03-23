import * as dotenv from 'dotenv'

// If runs without Docker
dotenv.config({ path: `${__dirname}/../.env` })

const data = process.env

export const env = data.ENV
export const isDev = env === 'development'
export const isProd = env === 'production'

export const eventListeners = [
  // Example:
  // `${__dirname}/app/listeners`,
]

export const http = {
  port: parseInt(data.HTTP_PORT) || 1337
}

export const jwt = {
  secret: data.JWT_SECRET || 'secret',
}

export const mongo = {
  uris: data.MONGO_HOST && data.MONGO_PORT
    ? `mongodb://${data.MONGO_HOST}:${data.MONGO_PORT}`
    : 'mongodb://localhost:27017',
  dbName: data.MONGO_DB_NAME || 'test',
  username: data.MONGO_USERNAME,
  password: data.MONGO_PASSWORD,
  debug: data.MONGO_DEBUG === 'true',
}

export const redis = {
  host: data.REDIS_HOST || '127.0.0.1',
  port: parseInt(data.REDIS_PORT) || 6379,
  username: data.REDIS_USERNAME,
  password: data.REDIS_PASSWORD,
}

export const telegram = {
  botToken: data.TELEGRAM_BOT_TOKEN,
}
