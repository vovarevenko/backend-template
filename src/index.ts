import './bootstrap'
import { http as cfg } from './config'
import { httpServer } from './web'

start()

function start() {
  httpServer.listen(cfg.port)
  console.log(`Application is up and running on port ${cfg.port}`)
}
