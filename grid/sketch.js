// Grid Demo - 2D Arrays
// Graham Lindsay
// October 27th, 2025

// if your going to hard code the grid, use this

// let theGrid = [[1, 0, 1, 0], 
//                [0, 0, 1, 1],
//                [1, 1, 0, 0],
//                [0, 1, 0, 1]];
// const SQUARE_DIMENSIONS = theGrid.length;

// if your going to randomize the grid, use this
let theGrid = [];
const SQUARE_DIMENSIONS = 50;

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width/SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height/SQUARE_DIMENSIONS;
  }
  theGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function draw() {
  background(220);
  showGrid();
}

function showGrid() {
  for (let y = 0; y < theGrid.length; y++) {
    for (let x = 0; x < theGrid.length; x++) {
      if (theGrid[y][x] === 1) {
        fill(0);
      }
      else if (theGrid[y][x] === 0) {
        fill(255);
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  toggleCell(x, y);
}

function toggleCell(x, y) {
  if (theGrid[y][x] === 1) {
    theGrid[y][x] = 0;
  }
  else if (theGrid[y][x] === 0) {
    theGrid[y][x] = 1;
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }

  return newGrid;
}