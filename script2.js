
// get both canvases
// get all canvas items for both (context, width and height)

const backgroundCanvas = document.getElementById('backgroundCanvas');
const contentCanvas = document.getElementById('contentCanvas');

const ctxBg = backgroundCanvas.getContext('2d');
const ctxContent = contentCanvas.getContext('2d');

// used one canvas to get dimensions
const canvasWidth = contentCanvas.width;
const canvasHeight = contentCanvas.height;

const canvasModal = document.querySelector('.canvasAlertModal');

const toolItems = document.querySelectorAll('.toolItem');



// inputs 
const gridInput = document.getElementById('gridInput');
const colorInput = document.getElementById('color');
const clearCanvasBtn = document.getElementById('canvasReset');
const gridLineColorInput = document.getElementById('gridColor');
const canvasColorInput = document.getElementById('canvasColor');
const toolsContainer = document.querySelector('.toolsContainer');

// Event Listeners
gridInput.addEventListener('input', setGrid);
colorInput.addEventListener('input', getColor);
toolsContainer.addEventListener('click', getToolInput);




contentCanvas.addEventListener('click', getCoords);

clearCanvasBtn.addEventListener('click', clearCanvas);



let cellSize;
let gridSize;
let color = '000';
let selectedTool = 'brush';





// console.log(gridLinesColor());

function getColor(e) {

   color = e.target.value;
}

// setGrid()
// grid lines only being set on bg canvas

function clearCanvas() {
   ctxContent.clearRect(0, 0, canvasWidth, canvasHeight);
}


function setGrid(e) {

   
   // ctxBg.clearRect(0, 0, canvasWidth, canvasHeight);
   clearCanvas();

   // canvasModal.classList.add('hidden');
   ctxBg.clearRect(0, 0, canvasWidth, canvasHeight);
   // gridSize = 16;
   gridSize = e.target.value;

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
      ctxBg.strokeStyle = 'rgb(56, 56, 56)';
      ctxBg.stroke();
      
      offset = cellSize * i;
   }
   
}

console.log(contentCanvas.getBoundingClientRect());

function getCoords(e) {
   const { x: outSideX, y: outSideY } = contentCanvas.getBoundingClientRect();


   const mouseX = Math.max(Math.round(e.clientX - outSideX), 0);
   const mouseY = Math.max(Math.round(e.clientY - outSideY), 0);

   // console.log(mouseX, mouseY)

   // console.log(Math.floor(mouseX / cellSize))
   // console.log(Math.floor(mouseY / cellSize))
   // console.log(`(${Math.floor(mouseX / cellSize)}, ${Math.floor(mouseY / cellSize)})`)
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

   // ctxContent.fillRect(fillX * cellSize, fillY * cellSize, cellSize, cellSize);

   const fillXPos = fillX * cellSize;
   const fillYPos = fillY * cellSize;

   
   if(selectedTool === 'brush') {
      
      ctxContent.fillStyle = color;
      ctxContent.fillRect(fillXPos, fillYPos, cellSize, cellSize);
   } 
   else if (selectedTool === 'eraser') {
      console.log('erased')
      ctxContent.clearRect(fillXPos, fillYPos, cellSize, cellSize);

   }


}
   
  



// to add 
// maybe pixel size
// mouse down event to draw