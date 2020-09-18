import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../../../interfaces'

interface Props {
  product: Product
}

function ProductInfo({product}: Props) {
  return(
    <div className="col-sm-5">
      <div className="product-info" style={{padding: '1rem'}}>
        <div className="mt-4">
          <div>
            <Link to="/"></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo