import { CityField } from '../../app/models/fields'
import { CityDoc } from '../../app/models'

export function cityOutput(
  city: CityDoc | CityField
): Record<string, unknown> {
  return {
    id: city._id.toString(),
    name: city.name,
  }
}
