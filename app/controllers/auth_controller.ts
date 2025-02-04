import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import User from "#models/user"
import { inject } from '@adonisjs/core'
import { AuthService } from '#services/auth_service'

@inject()
export default class AuthController {

  constructor(private authService: AuthService) {}

  async login({ auth, request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    await auth.use().login(user)

    return user
  }

  async register({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await this.authService.register(payload, { auth })

    return user
  }

  async logout({ auth }: HttpContext) {
    await auth.use().logout()
    return {
      status: true,
    }
  }

  async me({ auth }: HttpContext) {
    return auth.user
  }
}