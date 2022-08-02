
// get both canvases
// get all canvas items for both (context, width and height)

// both canvases
const backgroundCanvas = document.getElementById('backgroundCanvas');
const contentCanvas = document.getElementById('contentCanvas');

// canvas context
const ctxBg = backgroundCanvas.getContext('2d');
const ctxContent = contentCanvas.getContext('2d');

// canvas dimensions
const canvasWidth = contentCanvas.width;
const canvasHeight = contentCanvas.height;




const toolItems = document.querySelectorAll('.toolItem');

// inputs 
const gridInput = document.getElementById('gridInput');
const colorInput = document.getElementById('color');
const clearCanvasBtn = document.getElementById('canvasReset');
const gridLineColorInput = document.getElementById('gridColor');
const canvasColorInput = document.getElementById('canvasColor');
const toolsContainer = document.querySelector('.toolsContainer');

// Event Listeners
colorInput.addEventListener('input', getColor);
gridInput.addEventListener('input', setGrid);
toolsContainer.addEventListener('click', getToolInput);
contentCanvas.addEventListener('click', getCoords);
clearCanvasBtn.addEventListener('click', clearCanvas);


let cellSize;
let gridSize;
let color = '000';
let selectedTool = 'brush';




function getColor(e) {
   color = e.target.value;
}


function clearCanvas() {
   ctxContent.clearRect(0, 0, canvasWidth, canvasHeight);
}


function setGrid(e) {

   
   clearCanvas();

   ctxBg.clearRect(0, 0, canvasWidth, canvasHeight);
   gridSize = e.target.value;

   cellSize = (canvasWidth / gridSize);
   console.log(cellSize)

   

   cellSize = (canvasWidth / gridSize);
   // console.log(cellSize);
   let offset = cellSize;

   for (let i = 1; i <= gridSize; i++) {
      
      ctxBg.beginPath();
      // x axis
      ctxBg.moveTo(0, offset);
      ctxBg.lineTo(canvasWidth, offset);
      // y axis
      ctxBg.moveTo(offset, 0);
      ctxBg.lineTo(offset, canvasHeight);
      ctxBg.strokeStyle = 'rgb(56, 56, 56)';
      ctxBg.stroke();
      
      offset = cellSize * i;
   }
   
}




function getCoords(e) {
   const { x: outSideX, y: outSideY } = contentCanvas.getBoundingClientRect();
   
   const mouseX = Math.max(Math.round(e.clientX - outSideX), 0);
   const mouseY = Math.max(Math.round(e.clientY - outSideY), 0);
   
   const cellX = Math.floor(mouseX / cellSize);
   const cellY = Math.floor(mouseY / cellSize);
   
   drawOnCanvas(cellX, cellY);
   
}


function getToolInput(e) {
   const tool = e.target.closest('.toolItem');
   if(!tool) return

   toolItems.forEach(tool => {
      tool.classList.remove('toolItem-active');
   })
   
   tool.classList.add('toolItem-active');
   selectedTool = tool.id;

}



function drawOnCanvas(fillX, fillY) {
   
   ctxContent.fillStyle = color;


   const fillXPos = fillX * cellSize;
   const fillYPos = fillY * cellSize;

   
   if(selectedTool === 'brush') {
      
      ctxContent.fillStyle = color;
      ctxContent.fillRect(fillXPos, fillYPos, cellSize, cellSize);
   } 
   else if (selectedTool === 'eraser') {
      ctxContent.clearRect(fillXPos, fillYPos, cellSize, cellSize);
   }
}



   
  



