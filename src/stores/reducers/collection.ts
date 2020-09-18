import { Collection } from '../../models'
import { SET_COLLECTION, SET_COLLECTIONS, SET_COLLECTIONS_ERROR, SET_COLLECTIONS_LOADING } from '../actions'

interface ICollectionState {
  readonly collections: Collection[]
  readonly collection: any
  readonly error: string
  readonly loading: boolean
}

const initialState: ICollectionState = {
  collections: [],
  collection: null,
  error: '',
  loading: false
}

export default (state = initialState, action: any): ICollectionState => {
  switch(action.type) {
    case SET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      }
    case SET_COLLECTION:
      return {
        ...state,
        collection: action.payload
      }
    case SET_COLLECTIONS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_COLLECTIONS_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}