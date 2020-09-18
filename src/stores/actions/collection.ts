import api from '../../api'
import { CollectionParam } from '../../interfaces'
import { Collection } from '../../models'
import { SET_COLLECTION, SET_COLLECTIONS, SET_COLLECTIONS_ERROR, SET_COLLECTIONS_LOADING } from './types'

const setCollections = (collections: Collection[]) => ({
  type: SET_COLLECTIONS,
  payload: collections
})

const setCollection = (collection: Collection) => ({
  type: SET_COLLECTION,
  payload: collection
})

const setError = (error: string) => ({
  type: SET_COLLECTIONS_ERROR,
  payload: error
})

const setLoading = (loading: boolean) => ({
  type: SET_COLLECTIONS_LOADING,
  payload: loading
})

export const loadCollections = (params: CollectionParam) => async (dispatch: any) => {
  dispatch(setLoading(true))
  api({
    method: 'GET',
    url: '/collections',
    params
  })
  .then(({data}) => {
    const {collections} = data
    const result = []
    for (const coll of collections) {
      const collection = new Collection()
      Object.assign(collection, coll)
      collection.image = coll.image ? coll.image.src : ''
      result.push(collection)
    }
    if (params.titles) {
      dispatch(setCollections(result))
    }
    if (params.handle) {
      dispatch(setCollection(result[0]))
    }
  })
  .catch((err) => {
    const error = err.response.data.error
    dispatch(setError(error))
  })
  .finally(() => dispatch(setLoading(false)))
}