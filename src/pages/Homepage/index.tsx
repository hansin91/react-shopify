import React from 'react'
import { Container } from 'react-bootstrap'
import {Carousel, CollectionCards, BannerWrapper} from './components'

function Homepage() {
  return(
    <div className="homepage">
      <Carousel />
      <Container>
        <CollectionCards />
        <BannerWrapper />
      </Container>
    </div>
  )
}

export default Homepage