import './styles.scss'
import React from 'react'
import parse from 'react-html-parser'
import { Collection } from '../../interfaces'
import { parseClassName } from '../../helpers';
import { Container } from 'react-bootstrap';

interface Props {
  data: Collection
  position: string
}

function Banner({data, position}: Props) {
  const className = parseClassName(position);
  return (
    <div className="banner col-sm-12"
      style={{ backgroundImage: `url(${data.image})`,
        height: '40vh',
        position: 'relative',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
      <div style={{height: '100%'}} className={`banner-text`}>
        <Container className={className} style={{height: 'inherit'}}>
          {parse(data.body_html)}
        </Container>
      </div>
    </div>
  )
}

export default Banner