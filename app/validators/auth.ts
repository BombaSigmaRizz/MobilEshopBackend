import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type LoginProps = Infer<typeof loginValidator>
export type RegisterProps = Infer<typeof registerValidator>

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2),
    email: vine.string().email().normalizeEmail({ gmail_remove_dots: false }).unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8),
  })
)