import './styles.scss'
import React, {useState} from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { LOGIN } from '../../apollo/Mutation'
import { FETCH_CUSTOMER } from '../../apollo/Query'
import useInputState from '../../hooks/useInputState'
import { setIsAuthenticated, setAuthMessage } from '../../stores/actions'
import { parseUser } from '../../stores/actions'

function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [error, setError] = useState('')
  const [password, handlePassword] = useInputState('')
  const [email, handleEmail] = useInputState('')
  const message = useSelector((state: RootStateOrAny) => state.auth.message)

  const [loggedUser] = useLazyQuery(FETCH_CUSTOMER, {
    onCompleted: (payload: any) => {
      dispatch(parseUser(payload))
      const {customer} = payload
      localStorage.setItem('user', JSON.stringify(customer))
      if (customer.lastIncompleteCheckout) {
        localStorage.setItem('checkout', customer.lastIncompleteCheckout.id)
      }
      history.push('/')
    },
    onError: (error: any) => {
      if (error) {
        error = error.graphQLErrors[0].message
        setError(error)
        dispatch(setIsAuthenticated(false))
      }
    }
  })

  const [login, {loading}] = useMutation(LOGIN,{
    onCompleted: (payload: any) => {
      const { customerAccessTokenCreate:{customerAccessToken, customerUserErrors} } = payload
      if (customerUserErrors.length) {
        setError('Invalid email / password')
        dispatch(setIsAuthenticated(false))
      }
      if (customerAccessToken) {
        const {accessToken} = customerAccessToken
        localStorage.setItem('token', accessToken)
        dispatch(setIsAuthenticated(true))
        dispatch(setAuthMessage(''))
        loggedUser({variables: {customerAccessToken: localStorage.getItem('token')}})
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

  const loginUser = (e: any) => {
    e.preventDefault()
    const input = {
      email,
      password
    }
    login({variables: {input}})
  }

  return (
    <div className="login-wrapper bg-dark">
      <Container className="login-container">
        <div className="login-form">
          <Link to="/" className="nav-link">
            <h1 className="text-center">HandyCrafties</h1>
          </Link>
          <h3 className="text-center" style={{paddingBottom: '0.8rem'}}>Login</h3>
          {message && <Alert variant={'success'}>{message}</Alert> }
          {error && <Alert variant={'danger'}>{error}</Alert>}
          <Form onSubmit={loginUser} style={{ minWidth: '500px'}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" onChange={handleEmail} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" onChange={handlePassword} type="password" placeholder="Password" />
            </Form.Group>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {!loading &&
                <Button variant="primary" type="submit">
                  Login
                </Button>
              }
              {loading &&
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              }
              <Link to="/register">
                <span className="btn-link">Don't have an account ?</span>
              </Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export default Login