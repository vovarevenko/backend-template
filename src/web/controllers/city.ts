import { Controller, Get } from 'koa-ts-controllers'
import { CityModel } from '../../app/models'
import { cityOutput } from '../outputs/city'

@Controller('/cities')
export default class CityController {

  @Get('/')
  async list() {
    const query = CityModel.find().sort({ name: 1 })
    return (await query.exec()).map(cityOutput)
  }

  @Get('/current')
  async current() {
    const city = await CityModel.findOne().sort({ _id: 1 })
    return cityOutput(city)
  }

}
