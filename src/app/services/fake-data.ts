import { CityModel } from '../../app/models'

export async function createFakeData(): Promise<void> {
  await CityModel.create({ name: 'Москва' })
  // TODO: other data...
}
