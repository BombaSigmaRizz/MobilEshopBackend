import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      
      table.integer('price').notNullable()
      
      table.string('description').notNullable()
      
      table.string('showcase_image').notNullable()
      
      table.specificType('catalog_images', 'varchar[]').notNullable().defaultTo('{}')

      table.string('brand').notNullable()

      table.string('storage').notNullable()

      table.string('color').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}