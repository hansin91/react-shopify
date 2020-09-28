import './styles.scss'
import React, { Fragment, useEffect, useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { collections as titles } from '../../config'
import { loadCollections } from '../../stores/actions'
import { Collection } from '../../interfaces'
import NavDropdownMenu from '../NavDropdownMenu'
import { LOGOUT } from '../../apollo/Mutation'
import { setIsAuthenticated, setLoggedUser } from '../../stores/actions'

const parseTitles = (data: Array<any>) => {
  const titles = []
  for (const d of data ) {
    titles.push(d.name)
  }
  return titles
}

function NavbarApp() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [,setError] = useState('')
  const collections = useSelector((state: RootStateOrAny) => state.collection.collections)
  const isAuthenticated = useSelector((state: RootStateOrAny) => state.auth.isAuthenticated)
  const user = useSelector((state: RootStateOrAny) =>state.auth.user)
  const params = {
    titles: parseTitles(titles).join(',')
  }
  useEffect(() => {
    dispatch(loadCollections(params))
  },[])

  const [logout] = useMutation(LOGOUT, {
    onCompleted: (payload: any) => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('checkout')
      dispatch(setIsAuthenticated(false))
      dispatch(setLoggedUser(null))
      history.push('/')
    },
    onError: (error: any) => {
      if (error) {
        error = error.graphQLErrors[0].message
        dispatch(setIsAuthenticated(true))
        setError(error)
      }
    }
  })

  const logoutUser = () => {
    logout({variables: { customerAccessToken: localStorage.getItem('token') }})
  }

  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Link to="/">
      <Navbar.Brand>HandyCrafties</Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title="Collections" id="collasible-nav-dropdown">
          {collections && collections.length > 0
            && collections.map((collection: Collection) => <NavDropdownMenu key={collection.id} data={collection} /> )}
        </NavDropdown>
      </Nav>
      {!isAuthenticated &&
        <Nav>
          <Link to="/login" className="nav-link">Login</Link>
        </Nav>
      }
      {isAuthenticated && user &&
        <Fragment>
          <Nav>
            <Link to="/checkout">
              <div className="navbar-shopping-bag">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </div>
            </Link>
          </Nav>
          <Nav>
            <div className="user-profile-wrapper"
              onMouseLeave={() => setVisible(false)}
              onMouseEnter={() => setVisible(true)}>
              <div className="user-profile-name">{user.displayName[0]}</div>
              <div className={`user-profile-menu ${visible ? 'show': 'hide'}`}>
                <span onClick={logoutUser} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>Logout</span>
              </div>
            </div>
          </Nav>
        </Fragment>
      }
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavbarApp;