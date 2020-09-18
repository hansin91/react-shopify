import { combineReducers } from 'redux'
import carousel from './carousel'
import homepage from './homepage'
import banner from './banner'
import collection from './collection'
import product from './product'

export default combineReducers({
  carousel,
  homepage,
  banner,
  collection,
  product
})