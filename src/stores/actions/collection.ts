import api from '../../api'
import { Collection } from '../../models'
import { SET_COLLECTIONS, SET_COLLECTIONS_ERROR, SET_COLLECTIONS_LOADING } from './types'

const setCollections = (collections: Collection[]) => ({
  type: SET_COLLECTIONS,
  payload: collections
})

const setError = (error: string) => ({
  type: SET_COLLECTIONS_ERROR,
  payload: error
})

const setLoading = (loading: boolean) => ({
  type: SET_COLLECTIONS_LOADING,
  payload: loading
})

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
    // const [collection] = collections
    // const banner = new Collection()
    // Object.assign(banner, collection)
    // banner.image = collection.image.src
    // dispatch(setBanner(banner))
  })
  .catch((err) => {
    const error = err.response.data.error
    dispatch(setError(error))
  })
  .finally(() => dispatch(setLoading(false)))
}