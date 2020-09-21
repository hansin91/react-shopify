import './styles.scss'
import React, { Fragment, useEffect} from 'react'
import Konva from 'konva'
import { stages } from 'konva/types/Stage'

interface Props {
  visible: boolean
  backgroundImage: any
  name: string
  imageFile: any
}

const STAGE_WIDTH = 2400
const STAGE_HEIGHT = 2400

function ProductCanvas({visible, backgroundImage, name, imageFile}: Props) {

  const drawBackground = (imageObj: any, layer: any) => {
    const group = new Konva.Group();
    var image = new Konva.Image({
      image: imageObj,
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
    });
    group.add(image)
    layer.add(group);
    layer.batchDraw()
  }

  const drawImage = (imageFile: any, layer: any) => {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL(imageFile);
    const img = new window.Image()
    img.src = url;
    img.onload = function() {

      const img_width = img.width;
      const img_height = img.height;
      // calculate dimensions to get max 300px
      const max = 500;
      const ratio = (img_width > img_height ? (img_width / max) : (img_height / max))
      const image = new Konva.Image({
        image: img,
        x: STAGE_WIDTH / 2,
        y: STAGE_HEIGHT / 2,
        width: img_width/ratio,
        height: img_height/ratio,
        draggable: true,
      });
      image.offsetX(image.width() / 2);
      layer.add(image)
      layer.batchDraw()
    }
  }

  const renderCanvas = (imageFile?: any) => {

    const stage = new Konva.Stage({
      container: 'container',
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      visible,
    });

    const layer = new Konva.Layer()
    stage.add(layer);
    drawBackground(backgroundImage.current, layer)
    const text = new Konva.Text({
      x: stage.width() / 2,
      y: (stage.width() / 2) - 200,
      fontSize: 100,
      align: 'center',
      verticalAlign: 'middle',
      fontFamily: 'Calibri',
      text: name,
      fill: '#f7d976'
    });
    text.offsetX(text.width() / 2);
    layer.add(text)
    if (imageFile) {
      drawImage(imageFile, layer)
    }
    layer.draw();

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
    if (visible || name || imageFile) {
      renderCanvas(imageFile)
    }
  }, [visible, name, imageFile])

  return (
    <Fragment>
      <div style={{position:'absolute', top: 0, left: 0, width: '100%', height: '100%'}} id="stage-parent">
        <div style={{width: '100%', height: '100%'}} id="container"></div>
      </div>
    </Fragment>
  )
}

export default ProductCanvas