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
  onSetImagePositionY: Function
  onSetImagePositionX: Function
  onSetCanvas: Function
  imageFile: any
  imagePositionX: number
  imagePositionY: number
}

const getProductImages = (images: Array<any>) => {
  const result = []
  let last
  let index = 1
  for (const i of images as IProductImage[]) {
    const image = {
      original: i.originalSrc,
      thumbnail: i.originalSrc,
      originalAlt: i.altText,
      position: index
    }
    if (!image.originalAlt) {
      last = image
    }
    result.push(image)
    index++
  }
  result.pop()
  return {
    last,
    result
  }
}

function ProductImage({
    product,
    name,
    canvasVisible,
    imagePositionX,
    imagePositionY,
    onCanvasVisible,
    onSetImagePositionY,
    onSetImagePositionX,
    onSetCanvas,
    imageFile
  }: Props) {
  const imageGalleryRef = useRef() as any

  const handleClick = () => {
    onCanvasVisible(false)
  }

  const [productImages, setProductImages] = useState([]) as any
  const [designImage, setDesignImage] = useState([]) as any
  useEffect(() => {
    let images = getProductImages(product.images)
    const {last, result} = images
    setDesignImage(last)
    setProductImages(result)
  }, [product.id])

  useEffect(() => {
    if (canvasVisible) {
      const {current} = imageGalleryRef
      current.slideToIndex(0)
    }
  },[canvasVisible])

  const renderItem = (item: any) => {
    return (
      <div className="image-gallery-image">
        <div className="item pplr">
          <img src={item.original} alt={product.title} className="w-100" />
          {item.position === 1 && canvasVisible &&
            <Fragment>
              <ProductCanvas
                imagePositionX={imagePositionX}
                imagePositionY={imagePositionY}
                onSetImagePositionY={onSetImagePositionY}
                onSetImagePositionX={onSetImagePositionX}
                onSetCanvas={onSetCanvas}
                imageFile={imageFile}
                visible={canvasVisible}
                name={name}
                backgroundImage={designImage} />
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
            onThumbnailClick={handleClick}
            renderItem={(item: any) => renderItem(item)}
            items={productImages} />
        </Fragment>
       }
    </div>
  )
}

export default ProductImage