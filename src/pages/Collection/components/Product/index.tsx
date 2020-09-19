import './styles.scss'
import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Product as IProduct } from '../../../../interfaces'
import { parseCurrency } from '../../../../helpers'

interface Props {
  data: IProduct
}

function Product({data}: Props) {
  const collection = useSelector((state: RootStateOrAny) => state.collection.collection)
  return (
    <Link to={`/collections/${collection.handle}/products/${data.handle}`} className="col-sm-4 product-card">
      <div className="product-card-wrapper">
        <div className="product-card-image">
          <img className="img-responsive w-100" src={data.image} alt={data.title} />
        </div>
        <div className="product-card-info">
          <p className="lead product-card-text text-center">{data.title}</p>
          <div className="product-card-price">
            <small className="text-muted"><span>from</span></small>
            <span className="product-card-price-display">{parseCurrency(data.minPrice.amount)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product