import api from '../../api'
import { Collection } from '../../models'
import { SET_CAROUSEL_SLIDES, SET_CAROUSEL_ERROR, SET_CAROUSEL_LOADING } from './types'

const setCarouselSlides = (slides: Array<Collection>) => ({
  type: SET_CAROUSEL_SLIDES,
  payload: slides
})

const setCarouselError = (error: string) => ({
  type: SET_CAROUSEL_ERROR,
  payload: error
})

const setCarouselLoading = (loading: boolean) => ({
  type: SET_CAROUSEL_LOADING,
  payload: loading
})

export const loadCarouselSlides = (slides: Array<any>) => async (dispatch: any) => {
  dispatch(setCarouselLoading(true))
  api({
    method: 'GET',
    url: '/collections',
    params: {
      titles: slides.join(',')
    }
  })
  .then(({data}) => {
    const {collections} = data
    const carouselSlides = []
    for (const slide of collections) {
      const carouselSlide = new Collection()
      Object.assign(carouselSlide, slide)
      carouselSlide.image = slide.image.src
      carouselSlides.push(carouselSlide)
    }
    dispatch(setCarouselSlides(carouselSlides))
  })
  .catch((err) => {
    const error = err.response.data.error
    dispatch(setCarouselError(error))
  })
  .finally(() => dispatch(setCarouselLoading(false)))
}