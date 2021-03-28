import { EventEmitter } from 'events'

export const eventEmitter = new EventEmitter()

export class Event {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  emit(data: unknown): boolean {
    return eventEmitter.emit(this.name, data)
  }

  addListener(listener: (data: unknown) => void): EventEmitter {
    return eventEmitter.addListener(this.name, listener)
  }
}

export * from './payment-canceled'
export * from './payment-created'
