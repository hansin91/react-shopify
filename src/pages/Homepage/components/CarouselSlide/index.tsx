import './styles.scss'
import React from 'react'
import { Slide } from '../../../../interfaces';
import parser from 'react-html-parser'

interface Props {
  slide:  Slide
}

function CarouselSlide({slide}: Props) {
  return (
    <div className="carousel-slide">
      <div style={{
        backgroundImage: `url(${slide.image})`,
        height: '80vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }}>
      </div>
      <div className="carousel-caption">
        {parser(slide.body_html)}
      </div>
    </div>
  )
}

export default CarouselSlide