import React from 'react'
import { Collection } from '../../../../interfaces';
import parser from 'react-html-parser'
import { Container } from 'react-bootstrap';

interface Props {
  slide:  Collection
}

function CarouselSlide({slide}: Props) {
  return (
    <div className="carousel-slide" style={{ position: 'relative' }}>
      <div style={{
        backgroundImage: `url(${slide.image})`,
        height: '80vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }}>
        <Container className="text-position-center text-center" style={{ height: '100%'}}>
          <div className="carousel-text">
            {parser(slide.body_html)}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default CarouselSlide