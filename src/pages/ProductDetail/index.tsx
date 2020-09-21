import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/react-hooks'
import { FETCH_PRODUCT_DETAIL } from '../../apollo/Query'
import { SpinnerLoading } from '../../components'
import { ProductImage, ProductInfo } from './components'
import { parseProducts } from '../../helpers'

function ProductDetail() {
  const {product, name} = useParams() as any
  const [error, setError] = useState('')
  const [productDetail, setProductDetail] = useState(null as any)
  const [namePersonalisation, setNamePersonalisation] = useState('Your Name')
  const [canvasVisible, setCanvasVisible] = useState(false)
  const [imageFile, setImageFile] = useState(null) as any
  const [ loadProductDetail, { loading } ] =
    useLazyQuery(FETCH_PRODUCT_DETAIL, { variables: { first: 1, query: product },
      fetchPolicy: 'cache-and-network',
      onCompleted: (({products}) => {
        const response = parseProducts(products)
        const [product] = response
        setProductDetail(product)
      }),
      onError: (error: any) => {
        if (error) {
          error = error.graphQLErrors[0].message
          setError(error)
        }
      }
    })
  useEffect(() => {
    loadProductDetail()
  },[product])

  const onCanvasVisible = (isVisible: boolean) => {
    setCanvasVisible(isVisible)
  }

  const onNamePersonalization = (name: string) => {
    if (!name) {
      name = 'Your Name'
    }
    setNamePersonalisation(name)
  }

  const onImageFile = (file: any) => {
    setCanvasVisible(true)
    setImageFile(file)
  }

  if (loading) {
    return <SpinnerLoading />
  }

  return(
    <div className="product-detail" style={{paddingTop: '50px'}}>
      <Container>
        {productDetail &&
          <div className="row">
            <ProductImage
              onCanvasVisible={onCanvasVisible}
              canvasVisible={canvasVisible}
              name={namePersonalisation}
              imageFile={imageFile}
              product={productDetail} />
            <ProductInfo
              onImageFile={onImageFile}
              onNamePersonalization={(name: string) => onNamePersonalization(name)}
              onFocusInput={onCanvasVisible}
              collection={name}
              product={productDetail} />
          </div>
        }
      </Container>
    </div>
  )
}

export default ProductDetail