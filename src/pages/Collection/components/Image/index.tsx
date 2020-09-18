import './styles.scss'
import React from 'react'
import parse from 'react-html-parser'
import { Collection } from '../../../../interfaces'
import { parseClassName } from '../../../../helpers'
import { Container } from 'react-bootstrap'

interface Props {
  collection: Collection
  position: string
}

function Image({collection, position}: Props) {
  const className = parseClassName(position)
  return (
    <div style={{ backgroundImage: `url(${collection.image})`,
    height: '55vh',
    position: 'relative',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'}}>
      <Container className={`${className}`} style={{ height: '100%'}}>
        <div className="text-center font-weight-bold color-white">
          {parse(collection.body_html)}
        </div>
      </Container>
    </div>
  )
}

export default Image