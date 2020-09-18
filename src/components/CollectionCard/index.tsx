import  './styles.scss'
import React from 'react'
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
    return <SpinnerLoading />
  }
  return (
    <div className={className} style={{ position:'relative' }}>
      <div className="collection-card"
        style={{ backgroundImage: `url(${collection.image})`,
        height: '40vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
        <Container className={`text-position-center text-center ${collection.title !== 'October Specials' ? 'card-text' : ''}`} style={{ height: '100%' }}>
          <div style={{paddingTop: '30px'}}>
            {parse(collection.body_html)}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default CollectionCard