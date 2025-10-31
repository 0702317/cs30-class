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
      if (grid[y][x] === 1) {
        fill(0);
      }
      else if (grid[y][x] === 0) {
        fill(255);
      }
      square(x * cellSize, y * cellSize, cellSize);
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