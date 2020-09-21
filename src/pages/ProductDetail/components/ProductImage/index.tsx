import './styles.scss'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import ImageGallery from 'react-image-gallery';
import { Product, ProductImage as IProductImage } from '../../../../interfaces'
import ProductCanvas from '../ProductCanvas'

interface Props {
  product: Product
  name: string
  canvasVisible: boolean
  onCanvasVisible: Function
  imageFile: any
}

const getProductImages = (images: Array<any>) => {
  const result = []
  for (const i of images as IProductImage[]) {
    const image = {
      original: i.transformedSrc,
      thumbnail: i.transformedSrc,
      originalAlt: i.altText
    }
    result.push(image)
  }
  const last = result.pop()
  return {
    last,
    result
  }
}

function ProductImage({product, name, canvasVisible, onCanvasVisible, imageFile}: Props) {
  const imageGalleryRef = useRef() as any

  const handleClick = (e: any) => {
    onCanvasVisible(false)
  }

  const [productImages, setProductImages] = useState([]) as any
  const [designImage, setDesignImage] = useState([]) as any
  const imageRef = React.createRef() as any
  useEffect(() => {
    let images = getProductImages(product.images)
    setDesignImage(images.last)
    setProductImages(images.result)
  }, [product.id])

  useEffect(() => {
    if (canvasVisible) {
      const {current} = imageGalleryRef
      current.slideToIndex(3)
    }
  },[canvasVisible])

  const renderItem = (item: any) => {
    return (
      <div className="image-gallery-image">
        <div className="item pplr">
          <img src={item.original} alt={product.title} className="w-100" />
          {item.originalAlt &&
            <Fragment>
              <ProductCanvas imageFile={imageFile} visible={canvasVisible} name={name} backgroundImage={imageRef} />
            </Fragment>
          }
        </div>
      </div>
    )
  }

  return (
    <div className="col-md-7">
      {productImages && productImages.length > 0 &&
        <Fragment>
          <ImageGallery
            thumbnailPosition={'bottom'}
            showFullscreenButton={false}
            showPlayButton={false}
            ref={imageGalleryRef}
            onThumbnailClick={(e: any, index: number) => handleClick(index) }
            renderItem={(item: any) => renderItem(item)}
            items={productImages} />
            <img ref={imageRef} src={designImage.original} alt="" className="hide w-100" />
        </Fragment>
       }
    </div>
  )
}

export default ProductImage