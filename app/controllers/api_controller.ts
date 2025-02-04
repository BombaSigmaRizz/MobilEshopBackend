import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Product from '#models/product'


@inject()
export default class ApiController {

  async getProduct( { params }: HttpContext ) {
    return Product.query().where('id', params.id).first()
  }

  async addProduct( { request }: HttpContext ) {
    // const payload = request.only()
    // return Product.create(payload)
  }

  async isUp() {
    return true
  }
}