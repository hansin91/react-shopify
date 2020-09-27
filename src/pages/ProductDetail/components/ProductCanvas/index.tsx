import './styles.scss'
import React, { Fragment, useEffect, useRef } from 'react'
import Konva from 'konva'
import {STAGE_HEIGHT_DIFF_BOTTOM, STAGE_HEIGHT_DIFF_TOP,STAGE_WIDTH_DIFF, STAGE_HEIGHT, STAGE_WIDTH} from '../../../../config'

interface Props {
  visible: boolean
  backgroundImage: any
  name: string
  imageFile: any
  onSetImagePositionY: Function
  onSetImagePositionX: Function
  onSetCanvas: Function
  imagePositionX: number
  imagePositionY: number
}

// const STAGE_WIDTH = 2400
// const STAGE_HEIGHT = 2400
// const STAGE_WIDTH_DIFF = 200
// const STAGE_HEIGHT_DIFF_TOP = 80
// const STAGE_HEIGHT_DIFF_BOTTOM = 200

// const IMAGE_POSITION = {
//   x: STAGE_WIDTH / 2,
//   y: (STAGE_HEIGHT / 2) - STAGE_HEIGHT_DIFF_TOP
// }

function ProductCanvas({
  imagePositionX,
  imagePositionY,
  onSetImagePositionY,
  onSetImagePositionX,
  onSetCanvas,
  visible,
  backgroundImage,
  name,
  imageFile
}: Props) {
  // const [imagePositionX, setImagePositionX] = useState(IMAGE_POSITION.x)
  // const [imagePositionY, setImagePositionY] = useState(IMAGE_POSITION.y)
  const imageRef = useRef() as any

      // if (canvas) {
      // // const dataURL = canvasStage.toDataURL({ pixelRatio: 3 });
      // // console.log(dataURL)
      // // const canvas = document.getElementsByTagName('canvas')[0]
      // // console.log(canvas.toDataURL())
      // const pdf = new jsPdf('l', 'pt', [canvas.width(), canvas.height()]);
      //   // first add texts
      //   // canvas.find('Text').forEach((text: any) => {
      //   //   const size = text.fontSize() / 0.75; // convert pixels to points
      //   //   pdf.setFontSize(size);
      //   //   // pdf.text(text.text(), text.x(), text.y(), {
      //   //   //   // baseline: 'top',
      //   //   //   // angle: -text.getAbsoluteRotation(),
      //   //   // });
      //   // });

      //   // then put image on top of texts (so texts are not visible)
      //   pdf.addImage(
      //     canvas.toDataURL({ pixelRatio: 1 }),
      //     0,
      //     0,
      //     canvas.width(),
      //     canvas.height()
      //   )
      //   onDataUrl(pdf)
      //   // pdf.save('download.pdf');
      // }

  const drawImage = (imageFile: any, layer: Konva.Layer, stage: Konva.Stage) => {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL(imageFile);
    const img = new window.Image()
    img.onload = function() {
      const img_width = img.width
      const img_height = img.height
      const max = 500;
      const ratio = (img_width > img_height ? (img_width / max) : (img_height / max))
      const HEIGHT_LIMIT_TOP = (stage.height() / 2) - (STAGE_HEIGHT_DIFF_TOP * stage.scaleY())
      const HEIGHT_LIMIT_BOTTOM = (stage.height() / 2) + (STAGE_HEIGHT_DIFF_BOTTOM * stage.scaleY())
      const WIDTH_LIMIT_RIGHT = (stage.width() / 2) + (STAGE_WIDTH_DIFF * stage.scaleX())
      const WIDTH_LIMIT_LEFT = (stage.width() / 2) - (STAGE_WIDTH_DIFF * stage.scaleX())
      const image = new Konva.Image({
        image: img,
        x: imagePositionX,
        y: imagePositionY,
        width: img_width/ratio,
        height: img_height/ratio,
        draggable: true,
        dragBoundFunc: ((pos) => {
          let newY = pos.y
          let newX = pos.x
          if (newY < HEIGHT_LIMIT_TOP) {
            newY = HEIGHT_LIMIT_TOP
          }
          if (newY > HEIGHT_LIMIT_BOTTOM) {
            newY = HEIGHT_LIMIT_BOTTOM
          }
          if (newX > WIDTH_LIMIT_RIGHT) {
            newX = WIDTH_LIMIT_RIGHT
          }
          if (newX < WIDTH_LIMIT_LEFT) {
            newX = WIDTH_LIMIT_LEFT
          }
          onSetImagePositionY(newY / stage.scaleY())
          onSetImagePositionX(newX / stage.scaleX())
          return {
            x: newX,
            y: newY,
          };
        })
      });
      image.offsetX(image.width() / 2);
      layer.add(image)
      layer.batchDraw()
    }
    img.setAttribute('crossorigin', 'anonymous');
    img.src = url
  }

  const renderText = () => {
    const text = new Konva.Text({
      x: STAGE_WIDTH / 2,
      y: (STAGE_WIDTH / 2) - 200,
      fontSize: 100,
      align: 'center',
      verticalAlign: 'middle',
      fontFamily: 'Calibri',
      text: name,
      fill: '#f7d976'
    });
    text.offsetX(text.width() / 2)
    return text
  }

  const renderStage = () => {
    const stage = new Konva.Stage({
      container: 'container',
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      visible
    });
    return stage
  }

  const renderCanvas = async (imageFile?: any) => {
    const stage = renderStage()
    const layer = new Konva.Layer()
    stage.add(layer)
    let img = new window.Image()
    img.setAttribute('crossorigin', 'anonymous')
    img.src = imageRef.current.src
    img.onload = () => {
      const image = new Konva.Image({
        image: img,
        x: 0,
        y: 0,
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT
      })
      layer.add(image)
      layer.batchDraw()
      const text = renderText()
      layer.add(text)
      if (imageFile) {
        drawImage(imageFile, layer, stage)
      }
    }
    await onSetCanvas(stage)

    function fitStageIntoParentContainer () {
      const container = document.querySelector('#stage-parent') as any
      if (container) {
        // now we need to fit stage into parent
        const containerWidth = container.offsetWidth;
        // to do this we need to scale the stage
        const scale = containerWidth / STAGE_WIDTH;
        stage.width(STAGE_WIDTH * scale);
        stage.height(STAGE_HEIGHT * scale);
        stage.scale({ x: scale, y: scale });
        stage.draw();
      }
    }
    fitStageIntoParentContainer();
    window.addEventListener('resize', fitStageIntoParentContainer)
  }

  useEffect(() => {
    if (visible) {
      renderCanvas(imageFile)
    }
  }, [visible, name, imageFile])

  return (
    <Fragment>
      <div style={{position:'absolute', top: 0, left: 0, width: '100%', height: '100%'}} id="stage-parent">
        <div style={{width: '100%', height: '100%'}} id="container"></div>
        <img ref={imageRef} src={backgroundImage.original} alt="" className="hide w-100" />
      </div>
    </Fragment>
  )
}

export default ProductCanvas