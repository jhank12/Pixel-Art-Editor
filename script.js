// get color and grid size
// separate function for grid size 
// call function on grid slider change

// const colorInput = document.getElementById('color');
// const gridInput = document.getElementById('gridInput');
// const gridNum = document.getElementById('gridNum');

// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');

// const canvasWidth = canvas.width;
// const canvasHeight = canvas.height;


// const xCoordDiv = document.getElementById('x');
// const yCoordDiv = document.getElementById('y');

// const size = 800;

// canvas.style.width = size;
// canvas.style.height = size;

// const scale = window.devicePixelRatio;

// canvas.width = Math.floor(size * scale);
// canvas.height = Math.floor(size * scale)

// ctx.scale(scale, scale);

// do media query for canvas through js


// gridInput.addEventListener('input', setGrid);
// colorInput.addEventListener('input', getColor);
// canvas.addEventListener('click', getCoords);
// canvas.addEventListener('mousedown', getCoords);




// let gridSize;
// let cellSize;




// function setGrid(e) {
   
//    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//    gridSize = e.target.value;

//    cellSize = canvasWidth / gridSize;
   
//    gridNum.innerText = gridSize; 

   
//    let offset = cellSize;

  

//    for (let i = 1; i <= gridSize; i++) {
//       // let offset = cellSize;
//       ctx.beginPath();
//       // x axis
//       ctx.moveTo(0, offset);
//       ctx.lineTo(canvasWidth, offset);
//       // y axis
//       ctx.moveTo(offset, 0);
//       ctx.lineTo(offset, canvasHeight);
//       ctx.strokeStyle = '#424242';
//       ctx.stroke();
      
//       offset = cellSize * i;
     

//    }
    
// }

// let color = '000';

// function getColor(e) {

//    color = e.target.value;
// }




// start comment
// function getCoords(e) {
//    console.log(e)
//    const { x: outSideX, y: outSideY } = canvas.getBoundingClientRect();


//    const mouseX = Math.max(Math.round(e.clientX - outSideX), 0);
//    const mouseY = Math.max(Math.round(e.clientY - outSideY), 0);


//    let xCoord;
//    let yCoord;

//    for (let i = 1; i <= gridSize; i++) {

//       let prevI = i - 1;
      
//       // mouseX coord
//       if (mouseX <= cellSize * i && mouseX >= cellSize * prevI) {
//          xCoord = i;
         
//          // console.log(xCoord)

//       }

     
//       if(mouseY <= cellSize * i && mouseY >= cellSize * prevI) {
//          yCoord = i;

//       }


//    }

   
//    let fillX = (xCoord * cellSize) - cellSize;
//    let fillY = (yCoord * cellSize) - cellSize;

//    drawOnCanvas(fillX, fillY);

//    xCoordDiv.innerText = xCoord;
//    yCoordDiv.innerText = yCoord;


// }



// end comment
   
   


// function drawOnCanvas(fillX, fillY) {

//    ctx.fillStyle = color;
//    ctx.fillRect(fillX, fillY, cellSize, cellSize);

// }


// features to add
// undo (ctrl z and/or an undo button)
// brush size (2x2, 3x3)
// eraser


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const canvasResetBtn = document.getElementById('canvasReset');

      
      
const toolsContainer = document.querySelector('.toolsContainer');
const toolItems = document.querySelectorAll('.toolItem');

// inputs
const colorInput = document.getElementById('color');
const gridInput = document.getElementById('gridInput');
const pixelSizeRange = document.getElementById('pixelRange');
const pixelTextEl = document.getElementById('pixelTextEl');

const canvasAlertModal = document.querySelector('.canvasAlertModal');

console.log(pixelSizeRange, pixelTextEl);

console.log(toolsContainer)

toolsContainer.addEventListener('click', getToolInput);
colorInput.addEventListener('input', getColor);
gridInput.addEventListener('input', setGrid);

pixelSizeRange.addEventListener('input', getPixelSize);

canvasResetBtn.addEventListener('click', clearCanvas);


let gridSize;
let cellSize;


// put others that need initial states into this func

let gridSizeSet = false;

window.onload = defaultStates;

function defaultStates() {
   if(!gridSizeSet) {
      canvasAlertModal.classList.add('hidden');
   }

   
}



function getPixelSize(e) {
   pixelTextEl.innerText = e.target.value;

   pixelSize = e.target.value;
   console.log(pixelSize);
}

canvas.addEventListener('click', getCoords);

// canvas.addEventListener('mouseout', closePreview);

function clearCanvas() {
   // set grid lines back
   ctx.clearRect(0,0, canvas.width, canvas.height);
   // setGrid();
   // generateGridLines();
}



// canvas.addEventListener('mousedown', getCoords);




let selectedTool = 'brush';


function getToolInput(e) {
   const tool = e.target.closest('.toolItem');
   if(!tool) return

   toolItems.forEach(tool => {
      tool.classList.remove('toolItem-active');
   })
   
   tool.classList.add('toolItem-active');
   selectedTool = tool.id;

 

}





   




// have a square that is the dimensions of the pixel size that follows the cursor when the 
// canvas is hovered 


function setGrid(e) {
   
   // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
   clearCanvas();
   gridSize = e.target.value;

   gridSizeSet = true;
   canvasAlertModal.classList.add('hidden')
   // gridSize = 8;

   cellSize = (canvasWidth / gridSize);
   // console.log(cellSize);
   
   generateGridLines();   
   
}




function generateGridLines(){
   let offset = cellSize;

   for (let i = 1; i <= gridSize; i++) {
      // let offset = cellSize;
      ctx.beginPath();
      // x axis
      ctx.moveTo(0, offset);
      ctx.lineTo(canvasWidth, offset);
      // y axis
      ctx.moveTo(offset, 0);
      ctx.lineTo(offset, canvasHeight);
      ctx.strokeStyle = '#424242';
      ctx.stroke();
      
      offset = cellSize * i;
   }
}

   
     




let color = '000';

function getColor(e) {

   color = e.target.value;
}

const previewClickEl = document.querySelector('.previewClick');
   


// rename to mouse events
function getCoords(e) {
   const { x: outSideX, y: outSideY } = canvas.getBoundingClientRect();


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
   
   if(selectedTool === 'brush') {
      
      ctx.fillStyle = color;
      ctx.fillRect(fillX, fillY, cellSize * pixelSize, cellSize * pixelSize);
   } 
   else {
      ctx.clearRect(fillX, fillY, cellSize, cellSize);
   }


}



// function closePreview() {
//    canvas.addEventListener('mouseout', function() {
//       previewClickEl.classList.add('hidden');
//    })
// }
     




// todo 
// eraser
// maybe allow grid bg color change


   
      
      





   



   




      

   




  

