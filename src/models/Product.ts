import { ProductImage }  from './ProductImage'
import { ProductVariant } from './ProductVariant'

export class Product {
  id!: number
  title!: string
  image!: string
  product_type!: string
  handle!: string
  body_html!: string
  variants!: ProductVariant[]
  images!: ProductImage[]
}