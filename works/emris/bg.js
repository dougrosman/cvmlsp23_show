// Define an array of image filenames
const mapImageUrls = [];
const satImageUrls = [];

//populate array
for (let i = 0; i < 33; i++){
    mapImageUrls.push(
        "maps/"+i+"_fake.png"
    );
    satImageUrls.push(
        "sat/"+i+"_real.png"
    );
} 

// Define the minimum and maximum number of rows and columns in the grid
const minRows = 2;
const maxRows = 4;
const minCols = 2;
const maxCols = 3;

// Create a grid of cells
let cells = [];

function createGrid() {

  var grid = document.getElementById('background-grid');

  // Remove any existing cells
  cells.forEach((cell) => {
    cell.remove();
  });

  // Calculate the number of rows and columns in the grid based on the window size
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const numCols = Math.floor(Math.random() * (maxCols - minCols + 1)) + minCols;
  const numRows = Math.floor(Math.random() * (maxRows - minRows + 1)) + minRows;

  // Define the gap size between cells
const cellGap = 5;

// Calculate the width and height of each cell, including the gap
const cellWidth = Math.floor((windowWidth - (cellGap * (numCols - 1))) / numCols);
const cellHeight = Math.floor((windowHeight - (cellGap * (numRows - 1))) / numRows);

// Create a grid of cells with the gap
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    const cell = document.createElement('div');
    cell.style.position = 'absolute';
    cell.classList.add("cell");
    cell.style.left = `${col * (cellWidth + cellGap)}px`;
    cell.style.top = `${row * (cellHeight + cellGap)}px`;
    cell.style.width = `${cellWidth}px`;
    width = cell.style.width;
    cell.style.height = `${cellHeight}px`;
    grid.appendChild(cell);
    cells.push(cell);
  }
}

  // Set the background of each cell to a different image
  let imageIndex = 0;
  cells.forEach((cell, index) => {
    cell.style.backgroundImage = `url(${mapImageUrls[imageIndex]})`;
    cell.style.backgroundRepeat = 'no-repeat';
    cell.style.backgroundSize = 'cover';
    imageIndex = (imageIndex + 1) % mapImageUrls.length;
  });

}

// Create the grid initially
createGrid();

// Re-create the grid whenever the window is resized
window.addEventListener('resize', createGrid);