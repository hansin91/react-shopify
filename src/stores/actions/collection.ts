import api from '../../api'
import { Collection } from '../../models'
import { SET_COLLECTION, SET_COLLECTIONS, SET_COLLECTIONS_ERROR, SET_COLLECTIONS_LOADING, SET_COLLECTION_ERROR, SET_COLLECTION_LOADING } from './types'

const setCollections = (collections: Collection[]) => ({
  type: SET_COLLECTIONS,
  payload: collections
})

const setCollection = (collection: Collection) => ({
  type: SET_COLLECTION,
  payload: collection
})

const setCollectionError = (error: string) => ({
  type: SET_COLLECTION_ERROR,
  payload: error
})

const setCollectionLoading = (loading: boolean) =>({
  type: SET_COLLECTION_LOADING,
  payload: loading
})

const setError = (error: string) => ({
  type: SET_COLLECTIONS_ERROR,
  payload: error
})

const setLoading = (loading: boolean) => ({
  type: SET_COLLECTIONS_LOADING,
  payload: loading
})

export const loadCollection = (handle: string) => async (dispatch: any) => {
  dispatch(setCollectionLoading(true))
  api({
    method: 'GET',
    url: '/collections',
    params: {
      handle
    }
  })
  .then(({data}) => {
    const {collections} = data
    const [response] = collections
    const collection = new Collection()
    Object.assign(collection, response)
    collection.image = response.image ? response.image.src : ''
    dispatch(setCollection(collection))
  })
  .catch((err) => {
    console.log(err)
    const error = err.response.data.error
    dispatch(setCollectionError(error))
  })
  .finally(() => dispatch(setCollectionLoading(false)))
}

export const loadCollections = (titles: Array<string>) => async (dispatch: any) => {
  dispatch(setLoading(true))
  api({
    method: 'GET',
    url: '/collections',
    params: {
      titles: titles.join(',')
    }
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
    dispatch(setCollections(result))
  })
  .catch((err) => {
    const error = err.response.data.error
    dispatch(setError(error))
  })
  .finally(() => dispatch(setLoading(false)))
}