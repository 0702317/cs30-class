// Grid Based Project - QR Code Generator
// Graham Lindsay
// November 12th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize;
let input;
let website = "www.wmcicompsci.ca"; // temp
const GRID_SIZE = 29;
const WHITE_PIXEL = 0;
const BLACK_PIXEL = 1;
const EMPTY_PIXEl = 2;

// function to preload files.
function preload() {
  emptyQR = loadJSON("empty-qr.json");
}

function setup() {
  // noStroke();
  createCanvas(windowWidth * 0.85, windowHeight * 0.85);
  if (width < height) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
  grid = generateEmptyQRCode(GRID_SIZE);
  createBinaryString(website);
}

// draw loop.
function draw() {
  background(255);
  displayQRCode();
}

function takeInput() {
  
}

function keyPressed() {
  if (key === "ENTER") {
    generateQRCode(website);
  }
}

// function to draw the grid.
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
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

// function to create the base QR code with the constant data from the json file.
function generateEmptyQRCode() {
  grid = emptyQR;
  
  return grid;
}

// function to generate the finished QR code.
function generateQRCode(website) {
  let binaryString = createBinaryString(website);
  let errorCorrectionBits = calculateErrorCorrection(binaryString);
  let finalDataString = binaryString + errorCorrectionBits;
}

// function to generate a binary data string from the input text.
function createBinaryString(website) {
  let characterCount = website.length.toString(2);
  let binaryString = "0100" + " " + characterCount + " "; // starting binary string that holds the data mode of the QR code and the length of the string.
  for (let i = 0; i < website.length; i++) {
    let byte = [0, 0, 0, 0, 0, 0, 0, 0]; // empty byte.
    let charCode = website.charCodeAt(i); // convert every letter in the website to a character code value.
    charCode = charCode.toString(2); // convert character code value to binary.
    
    for (let j = 0; j < charCode.length; j++) {
      byte.pop(); // removes all the zeroes from the byte that are not needed. The remaining zeroes are used to make the character code 8 digits.
    }
    
    binaryString = binaryString + byte.join("") + charCode + " "; // add the binary character code to the remaining zeroes and then add the completed byte to the binary string.
  }
  
  console.log(binaryString);
  return binaryString;
}

// function to generate the error correction bits for the QR code.
function calculateErrorCorrection(binaryString) {

}

// function to apply a mask to the QR code (I am only using mask 0).
function applyMask(grid) {

}