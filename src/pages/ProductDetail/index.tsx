import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import jsPdf from 'jspdf'
import { RootStateOrAny, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import api from '../../api'
import { FETCH_PRODUCT_DETAIL } from '../../apollo/Query'
import { CHECKOUT_CREATE, ADD_LINE_ITEMS } from '../../apollo/Mutation'
import { SpinnerLoading } from '../../components'
import { ProductImage, ProductInfo } from './components'
import { parseProducts } from '../../helpers'
import { IMAGE_POSITION } from '../../config'

function ProductDetail() {
  const {product, name} = useParams() as any
  const [error, setError] = useState('')
  const [productDetail, setProductDetail] = useState(null as any)
  const [namePersonalisation, setNamePersonalisation] = useState('Your Name')
  const [canvasVisible, setCanvasVisible] = useState(false)
  const [canvas, setCanvas] = useState(null) as any
  const [imagePositionX, setImagePositionX] = useState(IMAGE_POSITION.x)
  const [imagePositionY, setImagePositionY] = useState(IMAGE_POSITION.y)
  const [imageFile, setImageFile] = useState(null) as any
  const user = useSelector((state: RootStateOrAny) => state.auth.user)
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

  const [checkoutCreate] = useMutation(CHECKOUT_CREATE, {
    onCompleted: (payload: any) => {
      const {checkoutCreate:{checkout:{id}}} = payload
      localStorage.setItem('checkout', id)
      toast.success(`${productDetail.title} is added to cart`)
    },
    onError: (error: any) => {
      if (error) {
        error = error.graphQLErrors[0].message
        setError(error)
      }
    }
  })

  const [addLineItems] = useMutation(ADD_LINE_ITEMS, {
    onCompleted: (payload: any) => {
      toast.success(`${productDetail.title} is added to cart`)
    },
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

  const onSetCanvas = async(canvas: any) => {
    await setCanvas(canvas)
  }

  const convertCanvasToPDF = () => {
    const pdf = new jsPdf('l', 'pt', [canvas.width(), canvas.height()])
    pdf.addImage(
      canvas.toDataURL(),
      0,
      0,
      canvas.width(),
      canvas.height()
    )
    return pdf
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

  const onSetImagePositionX = (position: number) => {
    setImagePositionX(position)
  }

  const onSetImagePositionY = (position: number) => {
    setImagePositionY(position)
  }

  if (loading) {
    return <SpinnerLoading />
  }

  const uploadPDFFile = async (pdf: any, filename: string) => {
    const doc = pdf.output('blob')
    const file = new File([doc], filename, {
      type: doc.type,
      lastModified: doc.lastModified,
    });
    const formData = new FormData()
    formData.append('file', file)
    const {data} = await api({
      method:'POST',
      url: '/products/upload',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    })
    return data
  }

  const dataURLtoFile = (dataurl: any, filename: string) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
    return new File([u8arr], filename, {type:mime});
  };

  const onAddToCart = async (payload: any) => {
    // if (canvas) {
    //   const fileToUpload = dataURLtoFile(canvas.toDataURL({pixelRatio: 2}), 'image')
    //   const formData = new FormData()
    //   formData.append('file', fileToUpload)
    //   axios({
    //     method:'POST',
    //     url: 'http://localhost:4000/products/upload',
    //     data: formData,
    //     headers: {'Content-Type': 'multipart/form-data'}
    //   })
    //   .then(({data}) => {
    //     console.log(data)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // }
    if (user) {
      const {quantity, selectedProduct} = payload
      let url = ''
      if (canvas) {
        const pdf = convertCanvasToPDF()
        const {file:{location}} = await uploadPDFFile(pdf, selectedProduct.id)
        url = location
      }
      let customAttributes = [] as any
      if (url) {
        customAttributes = [{key: "url", value: url}]
      }
      const lineItems = [{
        variantId: selectedProduct.id,
        quantity,
        customAttributes
      }]
      const input = {
        lineItems,
        email: user.email
      }
      if (!user.lastIncompleteCheckout) {
        checkoutCreate({variables: {input} })
      } else {
        addLineItems({variables: {checkoutId: localStorage.getItem('checkout'), lineItems}})
      }
    }
    // const canvas = document.getElementsByTagName('canvas')[0]
    // const fileToUpload = dataURLtoFile(canvas.toDataURL(), 'image')
    // const formData = new FormData()
    // formData.append('file', fileToUpload)
    // axios({
    //   method:'POST',
    //   url: 'http://localhost:4000/products/upload',
    //   data: formData,
    //   headers: {'Content-Type': 'multipart/form-data'}
    // })
    // .then(({data}) => {
    //   console.log(data)
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
     // checkoutCreate({variables: {input} })
  }

  return(
    <div className="product-detail" style={{paddingTop: '50px'}}>
      <Container>
        {productDetail &&
          <div className="row">
            <ToastContainer
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              position={'top-right'} />
            <ProductImage
              onCanvasVisible={onCanvasVisible}
              onSetImagePositionY={onSetImagePositionY}
              onSetImagePositionX={onSetImagePositionX}
              onSetCanvas={onSetCanvas}
              canvasVisible={canvasVisible}
              name={namePersonalisation}
              imageFile={imageFile}
              imagePositionX={imagePositionX}
              imagePositionY={imagePositionY}
              product={productDetail} />
            <ProductInfo
              onImageFile={onImageFile}
              onAddToCart={onAddToCart}
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