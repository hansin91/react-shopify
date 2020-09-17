import { Collection } from '../../models'
import { SET_HOMEPAGE_CARDS, SET_HOMEPAGE_CARDS_ERROR, SET_HOMEPAGE_CARDS_LOADING } from '../actions'

interface IHomePageState {
  readonly cards: Array<Collection>
  readonly error: string
  readonly loading: boolean
}

const initialState: IHomePageState = {
  cards: [],
  error: '',
  loading: false
}

export default (state = initialState, action: any): IHomePageState => {
  switch(action.type) {
    case SET_HOMEPAGE_CARDS:
      return {
        ...state,
        cards: action.payload
      }
    case SET_HOMEPAGE_CARDS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_HOMEPAGE_CARDS_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}