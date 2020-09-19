import { ProductImage, ProductVariant, ProductOption, ProductPrice }  from '../interfaces'

export interface Product {
  id: string
  title: string
  image: string
  description: string
  description_html: string
  vendor: string
  product_type: string
  handle: string
  tags: Array<any>
  maxPrice: ProductPrice
  minPrice: ProductPrice
  options: ProductOption[]
  variants: ProductVariant[]
  images: ProductImage[]
}