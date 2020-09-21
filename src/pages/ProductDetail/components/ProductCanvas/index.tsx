// import React, { Component, Fragment } from 'react'
// import Konva from 'konva'

// type MyState = { width: number, height: number, visible: boolean, stage: any, layer: any, name: string };
// class ProductCanvas extends Component<any, MyState> {

//   constructor(props: any) {
//     super(props)
//     this.state = {
//       width: window.innerWidth,
//       height: window.innerHeight,
//       visible: false,
//       stage: null,
//       layer: null,
//       name: 'Your Name'
//     }
//   }

//   // componentDidMount() {
//   //   if (this.state.visible) {
//   //     this.renderCanvas()
//   //   }
//   // }

//   componentDidUpdate(prevProps: any) {
//     if (this.props.visible !== prevProps.visible) {
//       this.setState({
//         visible: this.props.visible
//       })
//     }
//     if (this.props.name !== prevProps.name) {
//       this.setState({
//         name: this.props.name
//       })
//     }
//     if (this.state.visible) {
//       this.renderCanvas()
//     }
//   }

  // renderCanvas = () => {
  //   var stageWidth = 1000
  //   var stageHeight = 1000
  //   var stage = new Konva.Stage({
  //     container: 'container',
  //     width: stageWidth,
  //     height: stageHeight,
  //     visible: this.state.visible
  //   });

  //   var group1 = new Konva.Group();

  //   function fitStageIntoParentContainer() {
  //     var container = document.querySelector('#stage-parent') as any
  //     if (container) {
  //       // now we need to fit stage into parent
  //       var containerWidth = container.offsetWidth;
  //       // to do this we need to scale the stage
  //       var scale = containerWidth / stageWidth;

  //       stage.width(stageWidth * scale);
  //       stage.height(stageHeight * scale);
  //       stage.scale({ x: scale, y: scale });
  //       stage.draw();
  //     }
  //   }
  //   var layer = new Konva.Layer()
  //   stage.add(layer);
  //   const drawImage = (imageObj : any) => {
  //     // darth vader
  //     var darthVaderImg = new Konva.Image({
  //       image: imageObj,
  //       x: 0,
  //       y: 0,
  //       width: stageWidth,
  //       height: stageHeight,
  //     });

  //     // add cursor styling
  //     darthVaderImg.on('mouseover', function () {
  //       document.body.style.cursor = 'pointer';
  //     });
  //     darthVaderImg.on('mouseout', function () {
  //       document.body.style.cursor = 'default';
  //     });
  //     // darthVaderImg.zIndex(0)
  //     group1.add(darthVaderImg)
  //     // layer.add(darthVaderImg);
  //     layer.batchDraw()
  //   }
  //   // var group1 = new Konva.Group();
  //     layer.add(group1);
  //     fitStageIntoParentContainer();
  //     // adapt the stage on any window resize
  //     window.addEventListener('resize', fitStageIntoParentContainer);
  //     drawImage(this.props.backgroundImage.current)
  //     // var imageObj = new Image();
  //     // console.log(this.props.backgroundImage.current)
  //     // imageObj.src = this.props.backgroundImage.current
  //     // imageObj.onload = function () {
  //     //   drawImage(this);
  //     // }

  //     var group3 = new Konva.Group();
  //     layer.add(group3)
  //     var text = new Konva.Text({
  //       x: stage.width() / 2,
  //       y: (stage.height() / 2) + 80,
  //       fontSize: 30,
  //       width: stage.width() / 2,
  //       align: 'center',
  //       verticalAlign: 'center',
  //       text: this.state.name,
  //       fill: '#f7d976'
  //     });
  //     group3.add(text);

  //     // var redCircle = new Konva.Circle({
  //     //   x: 70,
  //     //   y: 70,
  //     //   fill: 'red',
  //     //   radius: 30,
  //     // });
  //     // group3.add(redCircle);

  //     // now the red circle on on top of black rectangle
  //     // we can change its zIndex with:
  //     //redCircle.zIndex(0);

  //     // if we what to move it back to the top we can change its zIndex again
  //     // or we can change zIndex of black rectangle:
  //     // blackRect.zIndex(0);
  //     // after that zIndex of red circle will be changed back to 1:
  //     // console.log('red circle index: ' + redCircle.zIndex());

  //     // crete second group with one shape
  //     // var group2 = new Konva.Group();
  //     // layer.add(group2);

  //     // var greenRect = new Konva.Rect({
  //     //   x: 70,
  //     //   y: 70,
  //     //   width: 100,
  //     //   height: 100,
  //     //   fill: 'green',
  //     //   draggable: true
  //     // });
  //     // group2.add(greenRect);

  //     var MIN_WIDTH = 20;
  //     var tr = new Konva.Transformer({
  //       nodes: [text],
  //       padding: 5,
  //       // enable only side anchors
  //       enabledAnchors: ['middle-left', 'middle-right'],
  //       // limit transformer size
  //       boundBoxFunc: (oldBox, newBox) => {
  //         if (newBox.width < MIN_WIDTH) {
  //           return oldBox;
  //         }
  //         return newBox;
  //       },
  //     });

  //     text.on('transform', () => {
  //       // with enabled anchors we can only change scaleX
  //       // so we don't need to reset height
  //       // just width
  //       text.setAttrs({
  //         width: Math.max(text.width() * text.scaleX(), MIN_WIDTH),
  //         scaleX: 1,
  //         scaleY: 1,
  //       });
  //     });
  //     // layer.add(tr);
  //     layer.draw();

  //   // var image = stage.toDataURL({mimeType: 'image/jpeg', quality: 1})
  //   // console.log(image)
  // }

//   render() {
//     return (
//       <Fragment>
//          <div style={{position:'absolute', top: 0, left: 0, width: '100%', height: '100%'}} id="stage-parent">
//           <div style={{width: '100%', height: '100%'}} id="container"></div>
//         </div>
//         {/* <div style={{
//           height:'100%', position: 'absolute', top:'0', left:'0', width: '100%'}} id="container"></div> */}
//       </Fragment>
//     )
//   }

// }
import './styles.scss'
import React, { Fragment, useEffect} from 'react'
import Konva from 'konva'

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

      // now load the Konva image
      const group = new Konva.Group()
      const image = new Konva.Image({
        image: img,
        x: 970,
        y: 1100,
        width: img_width/ratio,
        height: img_height/ratio,
        draggable: true,
      });
      // group.add(image)
      // layer.add(group)
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

    drawBackground(backgroundImage.current, layer)
    const text = new Konva.Text({
      x: 970,
      y: 970,
      fontSize: 100,
      align: 'center',
      verticalAlign: 'middle',
      fontFamily: 'Calibri',
      text: name,
      fill: '#f7d976'
    });
    // group2.add(text);
    layer.add(text)

    if (imageFile) {
      drawImage(imageFile, layer)
    }

    layer.draw();
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