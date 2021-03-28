import * as Bull from 'bull'
import { redis as cfg } from '../config'

export const socketMessages = new Bull('my-queue', { redis: cfg })

// Example:
// socketMessages.process(async job => {})
