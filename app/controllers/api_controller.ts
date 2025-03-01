import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { ApiService } from '#services/api_service'
import { addProductValidator } from '#validators/api'


@inject()
export default class ApiController {
  constructor(private apiService: ApiService) {}

  async getProduct( { params }: HttpContext ) {
    return this.apiService.getProduct(params.id)
  }

  async addProduct( { auth, request }: HttpContext ) {
    const payload = await request.validateUsing(addProductValidator)

    return await this.apiService.addProduct(payload)
  }

  async isUp() {
    return true
  }
}