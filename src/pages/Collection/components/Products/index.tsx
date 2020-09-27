import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/react-hooks'
import { Collection, Product as IProduct } from '../../../../interfaces'
import { SpinnerLoading } from '../../../../components'
import Product from '../Product'
import { FETCH_PRODUCTS } from '../../../../apollo/Query'
import { parseProducts } from '../../../../helpers'
import { Product as MProduct } from '../../../../models'

interface Props {
  collection: Collection
}

function Products({collection}: Props) {
  const [error, setError] = useState('')
  const [products, setProducts] = useState([] as MProduct[])

  const [ loadProductsCollection, { loading } ] =
    useLazyQuery(FETCH_PRODUCTS, { variables: { first: 1, query: collection.id.toString() },
      fetchPolicy: 'cache-and-network',
      onCompleted: (({collections}) => {
        const {edges} = collections
        const [data] = edges
        const {node:{products}} = data
        setProducts(parseProducts(products))
      }),
      onError: (error: any) => {
        if (error) {
          error = error.graphQLErrors[0].message
          setError(error)
        }
      }
    })
  useEffect(() => {
    loadProductsCollection()
  },[collection.id])

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