import { isDocument } from '@typegoose/typegoose'
import { ProductDoc } from '../../app/models'
import { shopOutput } from './shop'

export function productOutput(product: ProductDoc) {
  return {
    id: product._id.toString(),
    shop: isDocument(product.shop)
      ? shopOutput(product.shop)
      : product.shop?.toString(),
    name: product.name,
    weight: product.weight,
    photo: product.photo,
    desc: product.desc,
  }
}
