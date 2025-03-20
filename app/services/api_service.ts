import Product from "#models/product"
import { AddProductValidatorProps } from "#validators/api"
import { cuid } from "@adonisjs/core/helpers"
import app from "@adonisjs/core/services/app"

export class ApiService {
  async getProduct(id: number) {
    return await Product.query().where('id', id).firstOrFail()
  }

  async getProducts() {
    return Product.query()
  }

  async getProductReviews(params: any) {
    const product = await Product.query().where('id', params.id).preload('reviews').firstOrFail()
    return product.reviews
  }

  async addProductReview(payload: any) {
    const product = await Product.query().where('id', payload.productId).firstOrFail()
    return product.related('reviews').create({
      name: payload.name,
      content: payload.content,
      rating: payload.rating
    })
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