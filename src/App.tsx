import './App.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { RENEW_TOKEN } from './apollo/Mutation'
import { FETCH_CUSTOMER } from './apollo/Query'
import { AppLoading } from './components'
import { Home, Login, Register } from './pages'
import { setIsAuthenticated, parseUser } from './stores/actions'

function App() {
  const dispatch = useDispatch()
  const [,setError] = useState('')
  const [loggedUser, {loading: userLoading}] = useLazyQuery(FETCH_CUSTOMER, {
    onCompleted: (payload: any) => {
      dispatch(parseUser(payload))
      const {customer} = payload
      localStorage.setItem('user', JSON.stringify(customer))
    },
    onError: (error: any) => {
      if (error) {
        error = error.graphQLErrors[0].message
        setError(error)
        dispatch(setIsAuthenticated(false))
      }
    }
  })
  const [verifyToken, {loading} ] = useMutation(RENEW_TOKEN, {
    onCompleted: (payload: any) => {
      const {customerAccessTokenRenew: {customerAccessToken, userErrors}} = payload
      if (customerAccessToken) {
        dispatch(setIsAuthenticated(true))
        loggedUser({variables: {customerAccessToken: localStorage.getItem('token')}})
      }
      if (userErrors.length || !customerAccessToken) {
        dispatch(setIsAuthenticated(false))
      }
    },
    onError: (error: any) => {
      if (error) {
        error = error.graphQLErrors[0].message
        setError(error)
        dispatch(setIsAuthenticated(false))
      }
    }
  })

  useEffect(() => {
    verifyToken({variables: {customerAccessToken: localStorage.getItem('token') ? localStorage.getItem('token'): '' } })
  },[])

  if (loading && userLoading) {
    return <AppLoading />
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
