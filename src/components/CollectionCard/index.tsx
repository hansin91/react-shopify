import  './styles.scss'
import React from 'react'
import { Collection } from '../../interfaces'
import SpinnerLoading from '../SpinnerLoading'
import parse from 'react-html-parser'

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
      </div>
      <div className={`text-centered-over-image ${collection.title !== 'October Specials' ? 'card-text' : ''}`}>
        {parse(collection.body_html)}
      </div>
    </div>
  )
}

export default CollectionCard