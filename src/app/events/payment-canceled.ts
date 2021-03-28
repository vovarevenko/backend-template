import { EventEmitter } from 'events'
import { PaymentDoc } from '../models'
import { Event } from '.'

export interface PaymentCanceledData {
  payment: PaymentDoc
}

export interface PaymentCanceledInterface extends Event {
  emit(data: PaymentCanceledData): boolean
  addListener(listener: (data: PaymentCanceledData) => void): EventEmitter
}

export const PaymentCanceled = new Event(
  'PAYMENT_CANCELED'
) as PaymentCanceledInterface
