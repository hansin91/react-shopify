import { User } from '../../models'
import { SET_IS_AUTHENTICATED, SET_AUTH_MESSAGE, SET_LOGGED_USER } from './types'

export const setIsAuthenticated = (value: boolean) => ({
  type: SET_IS_AUTHENTICATED,
  payload: value
})

export const setAuthMessage = (message: string) => ({
  type: SET_AUTH_MESSAGE,
  payload: message
})

export const setLoggedUser = (user: any) => ({
  type: SET_LOGGED_USER,
  payload: user
})

export const parseUser = (payload: any) => async(dispatch: any) => {
  const {customer} = payload
  const user = new User()
  Object.assign(user, customer)
  dispatch(setLoggedUser(user))
}