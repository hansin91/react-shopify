import './styles.scss'
import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { Product, ProductImage as IProductImage } from '../../../../interfaces'

interface Props {
  product: Product
}

const getProductImages = (images: Array<any>) => {
  const result = []
  for (const i of images as IProductImage[]) {
    const image = {
      original: i.transformedSrc,
      thumbnail: i.transformedSrc
    }
    result.push(image)
  }
  return result
}

function ProductImage({product}: Props) {
  const [productImages, setProductImages] = useState([]) as any
  useEffect(() => {
    let images = getProductImages(product.images)
    setProductImages(images)
  }, [product.id])
  return (
    <div className="col-md-7">
      {productImages &&
        <ImageGallery
        thumbnailPosition={'left'}
        showFullscreenButton={false}
        showPlayButton={false}
        items={productImages} />
       }
    </div>
  )
}

export default ProductImage