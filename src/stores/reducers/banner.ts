import { SET_BANNER, SET_BANNER_ERROR, SET_BANNER_LOADING } from '../actions'

interface IBannerState {
  readonly banner: any
  readonly error: string
  readonly loading: boolean
}

const initialState: IBannerState = {
  banner: null,
  error: '',
  loading: false
}

export default (state = initialState, action: any): IBannerState => {
  switch(action.type) {
    case SET_BANNER:
      return {
        ...state,
        banner: action.payload
      }
    case SET_BANNER_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_BANNER_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}