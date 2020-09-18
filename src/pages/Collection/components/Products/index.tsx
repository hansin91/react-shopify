import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Collection, Product as IProduct } from '../../../../interfaces'
import { loadProducts } from '../../../../stores/actions'
import { SpinnerLoading } from '../../../../components'
import Product from '../Product'

interface Props {
  collection: Collection
}

function Products({collection}: Props) {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootStateOrAny) => state.product.loading)
  const products = useSelector((state: RootStateOrAny) => state.product.products)
  useEffect(() => {
    dispatch(loadProducts(collection.id))
  },[dispatch, collection.id])

  if (loading) {
    return <SpinnerLoading />
  }

  return (
    <div className="products-wrapper" style={{paddingTop: '30px'}}>
      <Container>
        <div className="row">
         {products && products.map((product: IProduct) => <Product key={product.id} data={product}/> )}
        </div>
      </Container>
    </div>
  )
}

export default Products