import { Collection } from '../../models'
import { SET_COLLECTION, SET_COLLECTIONS, SET_COLLECTIONS_ERROR, SET_COLLECTIONS_LOADING, SET_COLLECTION_ERROR, SET_COLLECTION_LOADING } from '../actions'

interface ICollectionState {
  readonly collections: Collection[]
  readonly collection: any
  readonly error: string
  readonly loading: boolean
  readonly loadingCollection: boolean
}

const initialState: ICollectionState = {
  collections: [],
  collection: null,
  error: '',
  loading: false,
  loadingCollection: false
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
    case SET_COLLECTION_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_COLLECTIONS_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case SET_COLLECTION_LOADING:
      return {
        ...state,
        loadingCollection: action.payload
      }
    default:
      return state
  }
}