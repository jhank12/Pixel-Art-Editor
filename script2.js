
// get both canvases
// get all canvas items for both (context, width and height)

const backgroundCanvas = document.getElementById('backgroundCanvas');
const contentCanvas = document.getElementById('contentCanvas');

const ctxBg = backgroundCanvas.getContext('2d');
const ctxContent = contentCanvas.getContext('2d');

// used one canvas to get dimensions
const canvasWidth = contentCanvas.width;
const canvasHeight = contentCanvas.height;

// inputs 
clearCanvas = document.getElementById('canvasReset');

// Event Listeners
contentCanvas.addEventListener('click', getCoords);
clearCanvas.addEventListener('click', clearCanvas)



let cellSize;
let gridSize;

setGrid()
// grid lines only being set on bg canvas

function clearCanvas() {
   ctxContent.clearRect(0, 0, canvasWidth, canvasHeight);
}


function setGrid(e) {
   
   // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
   gridSize = 8;
   cellSize = (canvasWidth / gridSize);
   console.log(cellSize)

   
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


function getCoords(e) {
   const { x: outSideX, y: outSideY } = contentCanvas.getBoundingClientRect();


   const mouseX = Math.max(Math.round(e.clientX - outSideX), 0);
   const mouseY = Math.max(Math.round(e.clientY - outSideY), 0);

   console.log(mouseX, mouseY)

   
   let xCoord;
   let yCoord;
   
   for (let i = 1; i <= gridSize; i++) {
      
      let prevI = i - 1;
      
      // mouseX coord
      if (mouseX <= cellSize * i && mouseX >= cellSize * prevI) {
         xCoord = i;
         
         // console.log(xCoord)
         
      }
      
      if(mouseY <= cellSize * i && mouseY >= cellSize * prevI) {
         yCoord = i;
         
      }
      
   }

   
   let fillX = (xCoord * cellSize) - cellSize;
   let fillY = (yCoord * cellSize) - cellSize;
   // console.log(fillX, fillY);
   // console.log(xCoord, yCoord);
   // console.log(mouseX, mouseY)

   drawOnCanvas(fillX, fillY);

   
}
   



function drawOnCanvas(fillX, fillY) {
   // check what tool is selected 
   // if eraser set brush to bg color

   // console.log(selectedTool);
   

   ctxContent.fillRect(fillX, fillY, cellSize, cellSize);


   // if(selectedTool === 'brush') {
      
   //    ctx.fillStyle = color;
   //    ctx.fillRect(fillX, fillY, cellSize * pixelSize, cellSize * pixelSize);
   // } 
   // else {
   //    ctx.clearRect(fillX, fillY, cellSize, cellSize);
   // }


}