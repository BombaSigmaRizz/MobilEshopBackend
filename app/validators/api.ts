import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { EBrandTags, EColorTags, EStorageTags } from '../../types/types.js'

export type AddProductValidatorProps = Infer<typeof addProductValidator>

export const addProductValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string(),
    price: vine.number(),
    description: vine.string(),
    rating: vine.number(),
    images: vine.array(vine.string()),
    brand: vine.enum(EBrandTags),
    storage: vine.enum(EStorageTags),
    color: vine.enum(EColorTags)
  })
)