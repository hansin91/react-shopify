import React from 'react'
import { Collection } from '../../../../interfaces';
import parser from 'react-html-parser'

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
      </div>
      <div className="carousel-caption text-centered-over-image">
        {parser(slide.body_html)}
      </div>
    </div>
  )
}

export default CarouselSlide