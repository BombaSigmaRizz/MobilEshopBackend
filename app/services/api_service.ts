import Product from "#models/product"

export class ApiService {
  async getProduct(id: number) {
    return Product.query().where('id', id).firstOrFail()
  }

  async addProduct(payload: any) {
    return Product.create(payload)
  }

  async isUp() {
    return true
  }
}