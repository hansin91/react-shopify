import { Product, ProductVariant, ProductImage, ProductOption, ProductPrice } from '../models'

export const parseClassName = (position: string) => {
  let className= ''
  switch(position) {
    case 'left':
      className = 'text-position-left'
     break
    case 'right':
      className = 'text-position-right'
      break
    case 'center':
      className = 'text-position-center'
      break
  }
  return className
}

export const parseCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

export const parseProducts = (data: any) => {
  const {edges} = data
  const products = []
  for (const edge of edges) {
    const {node} = edge
    const {id, title, description, descriptionHtml, handle, productType, tags, vendor, variants: {edges}, images, options, priceRange} = node
    const product = new Product()
    product.id = id
    product.title = title
    product.description = description
    product.description_html = descriptionHtml
    product.handle = handle
    product.product_type = productType
    product.tags = tags
    product.vendor = vendor
    const productVariants = []
    for (const e of edges) {
      const {node} = e
      const {id, priceV2: {amount, currencyCode}, title, sku, weight, weightUnit} = node
      const variant = new ProductVariant()
      variant.id = id
      variant.currency = currencyCode
      variant.price = Number(amount)
      variant.title = title
      variant.sku = sku
      variant.weight = weight
      variant.weight_unit = weightUnit
      productVariants.push(variant)
    }
    const productImages = []
    for (const i of images.edges) {
      const {node} = i
      const image = new ProductImage()
      Object.assign(image, node)
      productImages.push(image)
    }
    product.images = productImages
    product.image = productImages[0].transformedSrc
    product.variants = productVariants
    const filteredOptions = options.filter((option: any) => option.name !== 'Title')
    const productOptions = []
    for (const op of filteredOptions) {
      const option = new ProductOption()
      Object.assign(option, op)
      productOptions.push(option)
    }
    if (priceRange) {
      const {maxVariantPrice, minVariantPrice} = priceRange
      const maxPrice = new ProductPrice()
      maxPrice.amount = Number(maxVariantPrice.amount)
      maxPrice.currency = maxVariantPrice.currencyCode
      const minPrice = new ProductPrice()
      minPrice.amount =  Number(minVariantPrice.amount)
      minPrice.currency = minVariantPrice.currencyCode
      product.maxPrice = maxPrice
      product.minPrice = minPrice
    }
    product.options = productOptions
    products.push(product)
  }
  return products
}