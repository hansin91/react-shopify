import { Product } from '../../models'
import { SET_PRODUCT, SET_PRODUCTS, SET_PRODUCTS_ERROR, SET_PRODUCTS_LOADING } from '../actions'

interface IProductState {
  readonly products: Product[]
  readonly product: any
  readonly error: string
  readonly loading: boolean
}

const initialState: IProductState = {
  product: null,
  products: [],
  error: '',
  loading: false
}

export default (state = initialState, action: any): IProductState => {
  switch(action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload
      }
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case SET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}