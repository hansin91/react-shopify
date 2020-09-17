import api from '../../api'
import { Collection } from '../../models'
import { SET_BANNER, SET_BANNER_ERROR, SET_BANNER_LOADING } from './types'

const setBanner = (banner: Collection) => ({
  type: SET_BANNER,
  payload: banner
})

const setError = (error: string) => ({
  type: SET_BANNER_ERROR,
  payload: error
})

const setLoading = (loading: boolean) => ({
  type: SET_BANNER_LOADING,
  payload: loading
})

export const loadBanner = (title: string) => async (dispatch: any) => {
  dispatch(setLoading(true))
  api({
    method: 'GET',
    url: '/collections',
    params: {
      titles: title
    }
  })
  .then(({data}) => {
    const {collections} = data
    const [collection] = collections
    const banner = new Collection()
    Object.assign(banner, collection)
    banner.image = collection.image.src
    dispatch(setBanner(banner))
  })
  .catch((err) => {
    const error = err.response.data.error
    dispatch(setError(error))
  })
  .finally(() => dispatch(setLoading(false)))
}