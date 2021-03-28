import { isDocument } from '@typegoose/typegoose'
import { OfferDoc } from '../../app/models'
import { cityOutput } from './city'
import { officeOutput } from './office'
import { productOutput } from './product'
import { shopOutput } from './shop'

export function offerOutput(offer: OfferDoc) {
  return {
    id: offer._id.toString(),
    shop: isDocument(offer.shop)
      ? shopOutput(offer.shop)
      : offer.shop['_id'].toString(),
    product: isDocument(offer.product)
      ? productOutput(offer.product)
      : offer.product['_id'].toString(),
    price: offer.price,
    oldPrice: offer.oldPrice,
    qty: offer.qty,
    validity: offer.validity,
    cities: offer.cities.map(cityOutput),
    offices: offer.offices.map(item =>
      isDocument(item) ? officeOutput(item) : item['_id'].toString()
    ),
  }
}
