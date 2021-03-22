import { Server } from 'socket.io'
import { PaymentCreated } from '../app/events'
import { httpServer } from '../web'

const webSocketApp = new Server(httpServer, {
  cors: { origin: '*' },
})

PaymentCreated.addListener(data => {
  webSocketApp.emit('payment-created', data)
})

export { webSocketApp }
