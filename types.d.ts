import { Authenticator } from "@adonisjs/auth";

declare global {
  type Auth = Authenticator<Authenticator>
}

export {}