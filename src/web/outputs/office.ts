import { isDocument } from '@typegoose/typegoose'
import { OfficeDoc } from '../../app/models'
import { cityOutput } from './city'
import { shopOutput } from './shop'

export function officeOutput(office: OfficeDoc) {
  return {
    id: office._id.toString(),
    shop: isDocument(office.shop)
      ? shopOutput(office.shop)
      : office.shop?.toString(),
    city: cityOutput(office.city),
    address: office.address,
    lastTouch: office.lastTouch,
  }
}
