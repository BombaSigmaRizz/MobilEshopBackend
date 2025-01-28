import User from "#models/user"
import { LoginProps, RegisterProps } from "#validators/auth"

export class AuthService {
  async login(payload: LoginProps) {
    const user = User.verifyCredentials(payload.email, payload.password)
    return user
  }

  async register(payload: RegisterProps) {
    const user = await User.create(payload)

    return user
  }
}