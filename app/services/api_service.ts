import Product from "#models/product"
import { AddProductValidatorProps } from "#validators/api"
import { cuid } from "@adonisjs/core/helpers"
import app from "@adonisjs/core/services/app"

export class ApiService {
  async getProduct(id: number) {
    return Product.query().where('id', id).firstOrFail()
  }

  async addProduct(payload: AddProductValidatorProps) {
    await payload.showcaseImage.move(app.makePath('storage/uploads'), {
      name: `${cuid()}.${payload.showcaseImage.extname}`
    })
    await Promise.all(payload.catalogImages.map(async (image) => {
      await image.move(app.makePath('storage/uploads'), {
        name: `${cuid()}.${image.extname}`
      })
    }))

    return Product.create({
      name: payload.name,
      price: payload.price,
      description: payload.description,
      rating: undefined,
      showcaseImage: payload.showcaseImage.fileName,
      catalogImages: payload.catalogImages.map(image => image.fileName!),
      brand: payload.brand,
      storage: payload.storage,
      color: payload.color
    })
  }

  async isUp() {
    return true
  }
}