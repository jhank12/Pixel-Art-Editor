
// get both canvases
// get all canvas items for both (context, width and height)

const backgroundCanvas = document.getElementById('backgroundCanvas');
const contentCanvas = document.getElementById('contentCanvas');

const ctxBg = backgroundCanvas.getContext('2d');
const ctxContent = contentCanvas.getContext('2d');

// used one canvas to get dimensions
const canvasWidth = contentCanvas.width;
const canvasHeight = contentCanvas.height;

let cellSize;
let gridSize;

setGrid()
// grid lines only being set on bg canvas

function setGrid(e) {
   
   // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
   gridSize = 8;
   cellSize = (canvasWidth / gridSize);

   
   // gridSize = 8;

   cellSize = (canvasWidth / gridSize);
   // console.log(cellSize);
   let offset = cellSize;

   for (let i = 1; i <= gridSize; i++) {
      // let offset = cellSize;
      ctxBg.beginPath();
      // x axis
      ctxBg.moveTo(0, offset);
      ctxBg.lineTo(canvasWidth, offset);
      // y axis
      ctxBg.moveTo(offset, 0);
      ctxBg.lineTo(offset, canvasHeight);
      ctxBg.strokeStyle = '#424242';
      ctxBg.stroke();
      
      offset = cellSize * i;
   }
   
}