// Grid Based Project - QR Code Generator
// Graham Lindsay
// November 12th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let input;
let website;
let isGenerated = false;
const GRID_SIZE = 29;
const CELL_SIZE = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  grid = generateEmptyQRCode(GRID_SIZE);
}

function draw() {
  background(220);
  if (isGenerated === false) {
    input = createInput('');
    input.position(width/2, height/2);
    input.input(takeInput);
  }
  else {
    displayQRCode();
  }
}

function takeInput() {
  website = input.value();
  console.log(website);
}

function keyPressed() {
  if (key === "ENTER") {
    grid = generateQRCode(website);
  }
  if (key === "r") {
    grid = generateEmptyQRCode();
  }
}

function displayQRCode() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill(0);
      }
      else if (grid[y][x] === 0) {
        fill(255);
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}


function generateEmptyQRCode() {
  let newQRCode = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    newQRCode.push([]);
    for (let x = 0; x < GRID_SIZE; x++) {
      newQRCode[y].push(0);
    }
  }
  return newQRCode;
}

function generateQRCode() {

}
