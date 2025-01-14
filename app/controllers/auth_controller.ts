import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    // const token = await aut
    // return response.json(token)
  }
}