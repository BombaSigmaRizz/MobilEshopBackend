import type { HttpContext } from '@adonisjs/core/http'


export default class BasketController {
  async getBasket( { request }: HttpContext ) {
    const storedBasket = request.cookie('basket', '')
    const basket: number[] = storedBasket ? JSON.parse(storedBasket) : []
    return basket
  }

  async addItemToBasket( { request, response }: HttpContext ) {
    const storedBasket = request.cookie('basket', '')
    const basket: number[] = storedBasket ? JSON.parse(storedBasket) : []

    const item = request.input('productId')
    basket.push(item)

    response.cookie('basket', JSON.stringify(basket))
  }

  async removeItemFromBasket( { request, response }: HttpContext ) {
    const storedBasket = request.cookie('basket', '')
    const basket: number[] = storedBasket ? JSON.parse(storedBasket) : []

    const item = request.param('id')
    const index = basket.indexOf(parseInt(item))

    if (index !== -1) {
      basket.splice(index, 1)
    }

    response.cookie('basket', JSON.stringify(basket))
  }
}