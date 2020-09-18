import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { loadProducts } from '../../stores/actions'
import { SpinnerLoading } from '../../components'

function ProductDetail() {
  const {product} = useParams() as any
  const params = {
    handle: product
  }
  const dispatch = useDispatch()
  const loading = useSelector((state: RootStateOrAny) => state.product.loading)
  useEffect(() => {
    dispatch(loadProducts(params))
  },[dispatch, product])

  if (loading) {
    return <SpinnerLoading />
  }

  return(
    <div className="product-detail">{product}</div>
  )
}

export default ProductDetail