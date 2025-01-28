import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import { AuthService } from '#services/auth_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
  constructor(private service: AuthService) {}

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    return await this.service.login({ email, password })
  }

  async register({ request }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    return await this.service.register(payload)
  }

  async logout({ auth }: HttpContext) {

  }

  async me({ auth }: HttpContext) {
    return auth.user
  }
}