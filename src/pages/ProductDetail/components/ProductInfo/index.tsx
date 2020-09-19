import './styles.scss'
import React from 'react'
import parse from 'react-html-parser'
import { Link } from 'react-router-dom'
import { Product } from '../../../../interfaces'

interface Props {
  product: Product
  collection: string
}

function ProductInfo({product, collection}: Props) {
  return(
    <div className="col-sm-5">
      <div className="product-info" style={{padding: '0 0.7rem'}}>
        <div className="product-info-detail">
          <Link className="text-decoration-none product-info-collection" to={`/collections/${collection}`}>
            <span style={{color: '#879898', display: 'block', paddingBottom: '10px'}}>{product.product_type}</span>
          </Link>
          <h1 className="product-info-title">{product.title}</h1>
          <div style={{color:'#879898'}}>{parse(product.description_html)}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo