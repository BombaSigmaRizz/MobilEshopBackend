import Review from './review.js'
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { type HasMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare discountPrice: number

  @column()
  declare description: string

  @column()
  declare showcaseImage: string

  @column()
  declare catalogImages: string[]

  @column()
  declare brand: string

  @column()
  declare storage: string

  @column()
  declare color: string

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}