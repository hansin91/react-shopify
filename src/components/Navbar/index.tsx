import React, { useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
      {/* <Nav>
        <Nav.Link href="#deets">More deets</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav> */}
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavbarApp;