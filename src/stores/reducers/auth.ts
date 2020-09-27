import { SET_IS_AUTHENTICATED, SET_AUTH_MESSAGE, SET_LOGGED_USER } from '../actions'

interface IAuthState {
  readonly isAuthenticated: boolean
  readonly message: string
  readonly user: any
}

const initialState: IAuthState = {
  isAuthenticated: false,
  message: '',
  user: null
}

export default (state = initialState, action: any): IAuthState => {
  switch(action.type) {
    case SET_LOGGED_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_AUTH_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    default:
      return state
  }
}