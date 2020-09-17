import './styles.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Collection } from '../../interfaces'

interface Props {
  data: Collection
}

function NavDropdownMenu({data}: Props) {
  return (
    <Link className="menus" to={`/collections/${data.handle}`}>
      <span className="dropdown-item">{data.title}</span>
    </Link>
  )
}

export default NavDropdownMenu