import api from '../../api'
import { Collection } from '../../models'
import { SET_HOMEPAGE_CARDS, SET_HOMEPAGE_CARDS_LOADING, SET_HOMEPAGE_CARDS_ERROR } from '../actions'

const setLoading = (loading: boolean) =>({
  type: SET_HOMEPAGE_CARDS_LOADING,
  payload: loading
})

const setError = (error: string) => ({
  type: SET_HOMEPAGE_CARDS_ERROR,
  payload: error
})

const setCards = (cards: Array<Collection>) => ({
  type: SET_HOMEPAGE_CARDS,
  payload: cards
})

export const loadHomepageCards = (slides: Array<any>) => async (dispatch: any) => {
  dispatch(setLoading(true))
  api({
    method: 'GET',
    url: '/collections',
    params: {
      titles: slides.join(',')
    }
  })
  .then(({data}) => {
    const {collections} = data
    const cards = []
    for (const collection of collections) {
      const card = new Collection()
      Object.assign(card, collection)
      card.image = collection.image.src
      cards.push(card)
    }
    dispatch(setCards(cards))
  })
  .catch((err) => {
    const error = err.response.data.error
    dispatch(setError(error))
  })
  .finally(() => dispatch(setLoading(false)))
}