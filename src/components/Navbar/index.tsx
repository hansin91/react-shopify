import './styles.scss'
import React, { Fragment, useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { collections as titles } from '../../config'
import { loadCollections } from '../../stores/actions'
import { Collection } from '../../interfaces'
import NavDropdownMenu from '../NavDropdownMenu'

const parseTitles = (data: Array<any>) => {
  const titles = []
  for (const d of data ) {
    titles.push(d.name)
  }
  return titles
}

function NavbarApp() {
  const dispatch = useDispatch()
  const collections = useSelector((state: RootStateOrAny) => state.collection.collections)
  const isAuthenticated = useSelector((state: RootStateOrAny) => state.auth.isAuthenticated)
  const user = useSelector((state: RootStateOrAny) =>state.auth.user)
  const params = {
    titles: parseTitles(titles).join(',')
  }
  useEffect(() => {
    dispatch(loadCollections(params))
  },[dispatch])

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
            <div className="navbar-shopping-bag">
              <FontAwesomeIcon icon={faShoppingBasket} />
            </div>
          </Nav>
          <Nav>
            <div className="user-profile-wrapper">
              <div className="user-profile-name">{user.displayName[0]}</div>
            </div>
          </Nav>
        </Fragment>
      }
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavbarApp;