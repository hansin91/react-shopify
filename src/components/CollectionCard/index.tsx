import  './styles.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Collection } from '../../interfaces'
import SpinnerLoading from '../SpinnerLoading'
import parse from 'react-html-parser'
import { Container } from 'react-bootstrap'

interface Props {
  collection: Collection
  loading: boolean
  className: string
}

function CollectionCard({className, collection, loading}: Props) {
  if (loading) {
    return (
      <div className={className}>
        <SpinnerLoading />
      </div>
    )
  }
  return (
    <Link to={`/collections/${collection.handle}`} className={`${className} collection-card`}>
      <div className="collection-card-image"
        style={{ backgroundImage: `url(${collection.image})`,
        height: '40vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
        <Container className="text-position-center text-center card-text" style={{ height: '100%' }}>
          <div style={{paddingTop: '30px'}}>
            {parse(collection.body_html)}
          </div>
            <h6 style={{
              margin: '0',
              cursor: 'pointer',
              color: '#fff',
              textDecoration: 'underline'}}>Shop Now</h6>
        </Container>
      </div>
    </Link>
  )
}

export default CollectionCard