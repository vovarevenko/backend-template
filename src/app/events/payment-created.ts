import { EventEmitter } from 'events'
import { PaymentDoc } from '../models'
import { Event } from '.'

export interface PaymentCreatedData {
  payment: PaymentDoc
}

export interface PaymentCreatedInterface extends Event {
  emit(data: PaymentCreatedData): boolean
  addListener(listener: (data: PaymentCreatedData) => void): EventEmitter
}

export const PaymentCreated = new Event(
  'PAYMENT_CREATED',
) as PaymentCreatedInterface
