import './styles.scss'
import React from 'react'
import parse from 'react-html-parser'
import { Collection } from '../../models'

interface Props {
  data: Collection
  position: string
}

const parseClassName = (position: string) => {
  let className= ''
  switch(position) {
    case 'right':
      className = "text-position-right"
      break
  }
  return className
}

function Banner({data, position}: Props) {
  const className = parseClassName(position);
  return (
    <div className="banner col-sm-12" style={{ position: 'relative'}}>
      <div className="banner-image"
        style={{ backgroundImage: `url(${data.image})`,
        height: '40vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
      </div>
      <div className={`banner-text ${className}`}>
        {parse(data.body_html)}
      </div>
    </div>
  )
}

export default Banner