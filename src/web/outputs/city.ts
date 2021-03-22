import { CityField } from '../../app/models/fields'
import { CityDoc } from '../../app/models'

export function cityOutput(city: CityDoc | CityField) {
  return {
    id: city._id.toString(),
    name: city.name,
  }
}
