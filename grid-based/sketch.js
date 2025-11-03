// Grid Based Project - QR Code Generator
// Graham Lindsay
// November 12th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize;
let input;
let website = "www.wmcicompsci.ca";
const GRID_SIZE = 29;
const WHITE_PIXEL = 0;
const BLACK_PIXEL = 1;
const EMPTY_PIXEl = 2;
const RESERVED_PIXEL = 3;

function preload() {
  emptyQR = loadJSON("empty-qr.json");
}

function setup() {
  createCanvas(windowWidth * 0.85, windowHeight * 0.85);
  if (width < height) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
  // noStroke();
  grid = generateEmptyQRCode(GRID_SIZE);
  convertInput(website);
}

function draw() {
  background(255);
  displayQRCode();
}

function takeInput() {

}

function convertInput(website) {
  for (let i = 0; i < website.length; i++) {
    // convert to ascii
    
    // convert to binary
    let byte;

    // return byte
    return byte;
  }
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
      if (grid[y][x] === 0) {
        fill(255);
      }
      else if (grid[y][x] === 1) {
        fill(0);
      }
      else if (grid[y][x] === 2) {
        fill(150);
      }
      else if (grid[y][x] === 3) {
        fill(0, 0, 255);
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

// function to generate the base QR code with the constant data
function generateEmptyQRCode() {
  // set the grid to the json file with the constant QR code data
  grid = emptyQR;

  return grid;
}

function generateQRCode() {

}