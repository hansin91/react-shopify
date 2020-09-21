import api from '../../api'
import { ProductParam } from '../../interfaces'
import { Product, ProductImage, ProductVariant } from '../../models'
import { SET_PRODUCT, SET_PRODUCTS, SET_PRODUCTS_ERROR, SET_PRODUCTS_LOADING } from './types'

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

const setProduct = (product: Product) => ({
  type: SET_PRODUCT,
  payload: product
})

export const loadProducts = (params: ProductParam) => async (dispatch: any) => {
  dispatch(setLoading(true))
  api({
    method: 'GET',
    url: '/products',
    params
  })
  .then(({data}) =>{
    const {products} = data
    const result = []
    for (const p of products) {
      const product = new Product()
      const {id, handle, image, title, product_type} = p
      product.id = id
      // product.body_html = body_html
      product.image = image.src
      product.title = title
      product.handle = handle
      product.product_type = product_type
      product.image = p.image.src
      const images = []
      const variants = []
      for (const image of p.images) {
        const productImage  = new ProductImage()
        const {id} = image
        productImage.id = id
        // productImage.height = height
        // productImage.width = width
        // productImage.src = src
        images.push(productImage)
      }
      for (const v of p.variants) {
        const {id, presentment_prices, title, sku, weight, weight_unit} = v
        const variant = new ProductVariant()
        variant.id = id
        // variant.grams = grams
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
    const {collectionId, handle} = params
    if (collectionId) {
      dispatch(setProducts(result))
    }
    if (handle) {
      dispatch(setProduct(result[0]))
    }
  })
  .catch((err) => {
    const error = err.response.data.error
    dispatch(setError(error))
  })
  .finally(() => dispatch(setLoading(false)))
}