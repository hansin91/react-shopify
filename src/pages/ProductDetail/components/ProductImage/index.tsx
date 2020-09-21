import './styles.scss'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import ImageGallery from 'react-image-gallery';
import { Stage, Rect, Transformer, Layer, Text, Image} from 'react-konva';
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

interface PropsRect {
  shapeProps: any
  isSelected: boolean
  onSelect: Function
  onChange: Function
}

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }: PropsRect) => {
  const shapeRef = React.useRef() as any
  const trRef = React.useRef() as any

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 200,
    height: 200,
    fill: 'red',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 200,
    height: 200,
    fill: 'green',
    id: 'rect2',
  },
];

function ProductImage({product, name, canvasVisible, onCanvasVisible, imageFile}: Props) {
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState(null) as any
  const imageGalleryRef = useRef() as any

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleClick = (e: any) => {
    onCanvasVisible(false)
  }

  const [productImages, setProductImages] = useState([]) as any
  const [designImage, setDesignImage] = useState([]) as any
  const [isDragging, setIsDragging] = useState(false)
  const [canvas, setCanvas] = useState(null) as any
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const canvasRef = React.createRef() as any
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
      // const slides = [...productImages]
      // const currentIndex = current.getCurrentIndex()
      // slides[currentIndex].active = true
      // setProductImages(slides)
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
              {/* <Stage
                className="canvas-wrap"
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                width={window.innerWidth}
                height={window.innerHeight}>
                <Layer>
                  <Image
                    image={imageRef.current}
                    x={0}
                    y={0}
                    width={window.innerWidth}
                    height={window.innerHeight} />
                </Layer>
              </Stage>
              <Stage
                draggable={true}
                className="canvas-wrap"
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                width={400}
                height={500}>
                <Layer>
                  <Text
                    x={0}
                    y={0}
                    text="hansin"
                    width={400}/>
                {rectangles.map((rect, i) => {
                  return (
                    <Rectangle
                      key={i}
                      shapeProps={rect}
                      isSelected={rect.id === selectedId}
                      onSelect={() => {
                        selectShape(rect.id);
                      }}
                      onChange={(newAttrs: any) => {
                        const rects = rectangles.slice();
                        rects[i] = newAttrs;
                        setRectangles(rects);
                      }}
                    />
                  );
                })}
                </Layer>
              </Stage> */}
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