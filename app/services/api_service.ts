import Product from '#models/product';

export class ApiService {
  async getProduct(id: number) {
    const product = await Product.query().where('id', id).firstOrFail()
    return product
  }
}