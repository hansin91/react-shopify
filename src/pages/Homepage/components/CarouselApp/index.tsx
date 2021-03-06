import React, { useEffect } from 'react'
import Slider from "react-slick";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { loadCarouselSlides } from '../../../../stores/actions'
import { carouselSlides } from '../../../../config'
import { SpinnerLoading } from '../../../../components'
import CarouselSlide from '../CarouselSlide'
import { Collection } from '../../../../interfaces'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  slidesPerRow: 1,
  slidesToShow: 1,
  adaptiveHeight: true,
  slidesToScroll: 1,
};

function CarouselApp() {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootStateOrAny) => state.carousel.loading)
  const slides = useSelector((state: RootStateOrAny) => state.carousel.slides)
  useEffect(() => {
    dispatch(loadCarouselSlides(carouselSlides))
  }, [dispatch])

  if (loading) {
    return <SpinnerLoading />
  }

  return (
    <div>
      <Slider {...settings}>
        {slides && slides.length > 0 && slides.map((slide: Collection) => <CarouselSlide key={slide.id} slide={slide} />)}
      </Slider>
    </div>
  )
}

export default CarouselApp