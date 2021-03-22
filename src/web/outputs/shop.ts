import { ShopDoc } from '../../app/models'
import { cityOutput } from './city'

export function shopOutput(shop: ShopDoc) {
  return {
    id: shop._id.toString(),
    name: shop.name,
    cover: shop.cover,
    cities: shop.cities.map(cityOutput),
  }
}
