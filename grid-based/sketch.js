// Grid Based Project - QR Code Generator
// Graham Lindsay
// November 12th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Most of the theory behind this is from Thonky.com's QR code tutorial: https://www.thonky.com/qr-code-tutorial/

let grid;
let cellSize;
let input;
let website = "www.wmcicompsci.ca"; // temp
const GRID_SIZE = 29;
const WHITE_PIXEL = 0;
const BLACK_PIXEL = 1;
const EMPTY_PIXEl = 2;
const REQUIRED_BITS = 440; // this depends on QR version and error correction level, which is constant for this project.

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
  if (key === "e") {
    grid = generateQRCode(website);
  }
}

// function to draw the grid.
function displayQRCode() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === WHITE_PIXEL) {
        fill(255);
      }
      else if (grid[y][x] === BLACK_PIXEL) {
        fill(0);
      }
      else if (grid[y][x] === EMPTY_PIXEl) {
        fill(150);
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

// function to create the base QR code with the constant data from the json file.
function generateEmptyQRCode() {
  grid = emptyQR; // set the grid to the empty QR code json file.
  
  return grid;
}

// function to generate the finished QR code.
function generateQRCode(website) {
  let binaryString = createBinaryString(website);
  let errorCorrectionBits = calculateErrorCorrection(binaryString);
  let finalDataString = binaryString + errorCorrectionBits;

  for (let y = GRID_SIZE; y > 0; y--) {
    for (let x = GRID_SIZE; x < 0; x--) {

    }
  }

  // console.log(finalDataString);
  return grid;
}

// function to generate a binary data string from the input text.
function createBinaryString(website) {
  let characterCount = findCharacterCount(website);

  let binaryString = "0100" + characterCount; // starting binary string that holds the data mode (0100) of the QR code and the length of the string in binary.
  for (let i = 0; i < website.length; i++) {
    let byte = [0, 0, 0, 0, 0, 0, 0, 0]; // empty byte.
    let charCode = website.charCodeAt(i); // convert every letter in the website to a character code value.
    charCode = charCode.toString(2); // convert character code value to binary.
    
    for (let j = 0; j < charCode.length; j++) {
      byte.pop(); // removes all the zeroes from the byte that are not needed. The remaining zeroes are used to make the character code 8 digits.
    }
    
    binaryString = binaryString + byte.join("") + charCode; // add the binary character code to the remaining zeroes and then add the completed byte to the binary string.
  }
  
  // bytePadding(binaryString);
  // binaryString = bytePadding(binaryString);
  console.log(binaryString);
  return binaryString;
}

// function to create a byte with the length of the website in binary.
function findCharacterCount(website) {
  let byte = [0, 0, 0, 0, 0, 0, 0, 0]; // empty byte.
  let characterCount = website.length.toString(2); // converts website length to binary string.

  for (let i = 0; i < characterCount.length; i++) {
    byte.pop(); // removes zeroes that are not needed.
  }

  characterCount = byte.join("") + characterCount; // adds the binary string to the remaining zeroes.
  return characterCount;
}

// function to make the string of bytes long enough to fit in the QR code.
function bytePadding(binaryString) {
  let remainingBits = REQUIRED_BITS - binaryString.length;
  if (remainingBits <= 4) {
    for (let i = 0; i < remainingBits.length; i++) {
      binaryString = binaryString + 0;
      remainingBits = REQUIRED_BITS - binaryString.length;
    }
  }
  console.log(remainingBits);
  return binaryString;
}

// function to generate the error correction bits for the QR code.
function calculateErrorCorrection(binaryString) {

}

// function to apply a mask to the QR code (I am only using mask 0).
function applyMask(grid) {

}