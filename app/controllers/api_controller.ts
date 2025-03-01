import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { ApiService } from '#services/api_service'
import { addProductValidator } from '#validators/api'
import { normalize, sep } from 'path'
import app from '@adonisjs/core/services/app'


@inject()
export default class ApiController {
  constructor(private apiService: ApiService) {}

  async getProduct( { params }: HttpContext ) {
    return this.apiService.getProduct(params.id)
  }

  async getProducts() {
    return this.apiService.getProducts()
  }

  async addProduct( { request }: HttpContext ) {
    const payload = await request.validateUsing(addProductValidator)

    return await this.apiService.addProduct(payload)
  }

  async getUpload({ request, response }: HttpContext) {
    const filePath = request.param('*').join(sep)
    const normalizedPath = normalize(filePath)
    const absolutePath = app.makePath('storage/uploads', normalizedPath)
    return response.download(absolutePath)
  }

  async isUp() {
    return true
  }
}