import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { Container } from 'react-bootstrap'
import { loadProducts } from '../../stores/actions'
import { SpinnerLoading } from '../../components'
import { ProductImage, ProductInfo } from './components'

function ProductDetail() {
  const {product} = useParams() as any
  const params = {
    handle: product
  }
  const dispatch = useDispatch()
  const loading = useSelector((state: RootStateOrAny) => state.product.loading)
  const productDetail = useSelector((state: RootStateOrAny) => state.product.product)
  useEffect(() => {
    dispatch(loadProducts(params))
  },[dispatch, product])

  if (loading) {
    return <SpinnerLoading />
  }

  return(
    <div className="product-detail" style={{paddingTop: '50px'}}>
      <Container>
        {productDetail &&
          <div className="row">
            <ProductImage product={productDetail} />
            <ProductInfo product={productDetail} />
          </div>
        }
      </Container>
    </div>
  )
}

export default ProductDetail