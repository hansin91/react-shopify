import api from '../../api'
import { Product, ProductImage } from '../../models'
import { ProductVariant } from '../../models/ProductVariant'
import { SET_PRODUCTS, SET_PRODUCTS_ERROR, SET_PRODUCTS_LOADING } from './types'

const setError = (error: string) => ({
  type: SET_PRODUCTS_ERROR,
  payload: error
})

const setLoading = (loading: boolean) => ({
  type: SET_PRODUCTS_LOADING,
  payload: loading
})

const setProducts = (products: Product[]) =>({
  type: SET_PRODUCTS,
  payload: products
})


export const loadProducts = (collectionId: number) => async (dispatch: any) => {
  dispatch(setLoading(true))
  api({
    method: 'GET',
    url: '/products',
    params: {
      collectionId
    }
  })
  .then(({data}) =>{
    const {products} = data
    const result = []
    for (const p of products) {
      const product = new Product()
      const {id, body_html, handle, image, title, product_type} = p
      product.id = id
      product.body_html = body_html
      product.image = image.src
      product.title = title
      product.handle = handle
      product.product_type = product_type
      product.image = p.image.src
      const images = []
      const variants = []
      for (const image of p.images) {
        const productImage  = new ProductImage()
        const {id, width, height, src} = image
        productImage.id = id
        productImage.height = height
        productImage.width = width
        productImage.src = src
        images.push(productImage)
      }
      for (const v of p.variants) {
        const {id, presentment_prices, grams, title, sku, weight, weight_unit} = v
        const variant = new ProductVariant()
        variant.id = id
        variant.grams = grams
        variant.title = title
        variant.sku = sku
        variant.weight = weight
        variant.weight_unit = weight_unit
        variant.price = Number(presentment_prices[0].price.amount)
        variant.currency = presentment_prices[0].price.currency_code
        variants.push(variant)
      }
      product.images = images
      product.variants = variants
      result.push(product)
    }
    dispatch(setProducts(result))
  })
  .catch((err) => {
    const error = err.response.data.error
    dispatch(setError(error))
  })
  .finally(() => dispatch(setLoading(false)))
}