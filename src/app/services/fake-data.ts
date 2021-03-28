import { CityModel } from '../../app/models'

export async function createFakeData() {
  await CityModel.create({ name: 'Москва' })
  // TODO: other data...
}
