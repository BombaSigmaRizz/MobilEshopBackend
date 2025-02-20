import User from "#models/user"
import { LoginProps, RegisterProps } from "#validators/auth"

export class AuthService {
  async login(payload: LoginProps) {
    const user = await User.verifyCredentials(payload.email, payload.password)
    return user
  }

  async register(payload: RegisterProps, options: { auth?: Auth } = {}) {
    const user = await User.create(payload)

    if (options.auth) {
      await options.auth.use().login(user)
    }

    return user
  }
}