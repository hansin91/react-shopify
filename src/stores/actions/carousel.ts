import api from '../../api'
import { Slide } from '../../models'
import { SET_CAROUSEL_SLIDES, SET_CAROUSEL_ERROR, SET_CAROUSEL_LOADING } from './types'

const setCarouselSlides = (slides: Array<Slide>) => ({
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
    url: '/carousel',
    params: {
      titles: slides.join(',')
    }
  })
  .then(({data}) => {
    const {slides} = data
    const carouselSlides = []
    for (const slide of slides) {
      const carouselSlide = new Slide()
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