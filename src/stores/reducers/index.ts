import { combineReducers } from 'redux'
import carousel from './carousel'
import homepage from './homepage'
import banner from './banner'
import collection from './collection'
import product from './product'
import auth from './auth'

export default combineReducers({
  carousel,
  homepage,
  banner,
  collection,
  product,
  auth
})