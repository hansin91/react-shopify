import './styles.scss'
import React from 'react'
import ImageGallery from 'react-image-gallery';
import { Product, ProductImage as IProductImage } from '../../../../interfaces'

interface Props {
  product: Product
}

const getProductImages = (images: Array<any>) => {
  const result = []
  for (const i of images as IProductImage[]) {
    const image = {
      original: i.src,
      thumbnail: i.src
    }
    result.push(image)
  }
  return result
}

function ProductImage({product}: Props) {
  const images = getProductImages(product.images)
  return (
    <div className="col-md-7">
      <ImageGallery
        thumbnailPosition={'left'}
        showFullscreenButton={false}
        showPlayButton={false}
        items={images} />
    </div>
  )
}

export default ProductImage