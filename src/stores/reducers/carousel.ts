import { SET_CAROUSEL_SLIDES, SET_CAROUSEL_ERROR, SET_CAROUSEL_LOADING } from '../actions'

interface IAppState {
  readonly slides: Array<any>
  readonly error: string
  readonly loading: boolean
}

const initialState: IAppState = {
  slides: [],
  error: '',
  loading: false
}

export default (state = initialState, action: any) => {
  switch(action.type) {
    case SET_CAROUSEL_SLIDES:
      return {
        ...state,
        slides: action.payload
      }
    case SET_CAROUSEL_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_CAROUSEL_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}