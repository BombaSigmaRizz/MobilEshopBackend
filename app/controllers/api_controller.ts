import type { HttpContext } from '@adonisjs/core/http'
import { ApiService } from '#services/api_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ApiController {
  constructor(private service: ApiService) {}

  async getProduct( { params }: HttpContext ) {
    return this.service.getProduct(params.id)
  }

  async isUp() {
    return true
  }
}