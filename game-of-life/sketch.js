// Game of Life
// Graham Lindsay
// October 29th, 2025

const CELL_SIZE = 30;
const RENDER_ON_FRAME = 2;
let grid;
let rows = 29;
let cols = 29;
let autoPlayIsOn = false;
let gosper;
let qr;

function preload() {
  gosper = loadJSON("gosper.json");
  qr = loadJSON("empty-qr.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // cols = Math.floor(width/CELL_SIZE);
  // rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  if (autoPlayIsOn && frameCount % 2 === 0) {
    grid = updateGrid();
  }
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you are toggling actually exists
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      grid[y][x] = 3;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 2) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 3) {
      grid[y][x] = 2;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === " ") {
    grid = updateGrid();
  }
  else if (key === "a") {
    autoPlayIsOn = !autoPlayIsOn;
  }
  else if (key === "g") {
    grid = gosper;  
  }
  else if (key === "q") {
    grid = qr;  
  }
}

function updateGrid() {
  let nextTurn = generateEmptyGrid(cols, rows);
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbors = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x + j >= 0 && x + j < cols && y + i >= 0 && y + i < rows) {
            neighbors += grid[y+i][x+j];
          }    
        }
      }
      // dont count self as neighbor
      neighbors -= grid[y][x];

      // apply the rules
      if (grid[y][x] === 1) {
        // curently allive
        if (neighbors === 2 || neighbors === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
      if (grid[y][x] === 0) {
        // currently dead
        if (neighbors === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill(255);
      }
      else if (grid[y][x] === 1) {
        fill(0);
      }
      else if (grid[y][x] === 2) {
        fill(140);
      }
      else if (grid[y][x] === 3) {
        fill(0, 0, 255);
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
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

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(2);
    }
  }

  return newGrid;
}