import './styles.scss'
import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Container, Form, Button, Spinner } from 'react-bootstrap'
import useInputState from '../../hooks/useInputState'
import { REGISTER } from '../../apollo/Mutation'
import { setAuthMessage } from '../../stores/actions'

function Register() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [firstName, handleFirstName] = useInputState('')
  const [lastName, handleLastName] = useInputState('')
  const [password, handlePassword] = useInputState('')
  const [email, handleEmail] = useInputState('')
  const [phone, handlePhone] = useInputState('')
  const [error, setError] = useState('')

  const [register, {loading}] = useMutation(REGISTER, {
    onCompleted: (payload: any) => {
      const {customerCreate: {customer, customerUserErrors}} = payload
      if (customer && !customerUserErrors.length) {
        dispatch(setAuthMessage('Register successfull. Please login here'))
        history.push('/login')
      }
    },
    onError: (error: any) => {
      if (error) {
        error = error.graphQLErrors[0].message
        setError(error)
      }
    }
  })

  const registerUser =(e: any) => {
    e.preventDefault()
    let input= {} as any
    input = {
      email,
      password
    }
    if (firstName) {
      input.firstName = firstName
    }
    if (lastName) {
      input.lastName = lastName
    }
    if (phone) {
      input.phone = phone
    }
    register({variables: {input}})
  }

  return (
    <div className="register-wrapper bg-dark">
      <Container className="register-container">
        <div className="register-form">
          <Link to="/" className="nav-link">
            <h1 className="text-center">HandyCrafties</h1>
          </Link>
          <h3 className="text-center" style={{paddingBottom: '0.8rem'}}>Register</h3>
          <Form onSubmit={registerUser} style={{ minWidth: '500px'}}>
            <Form.Group controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={handleFirstName}
                name="firstName"
                required type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={handleLastName}
                name="lastName"
                type="text" placeholder="Enter last name" />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                onChange={handlePhone}
                name="phone"
                type="text" placeholder="Enter phone name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleEmail}
                name="email" required type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handlePassword}
                name="password" required type="password" placeholder="Password" />
            </Form.Group>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {!loading &&
                <Button variant="primary" type="submit">
                  Register
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
              <Link to="/login">
                <span className="btn-link">Already have an account ?</span>
              </Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export default Register