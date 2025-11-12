// Grid Based Project - QR Code Generator
// Graham Lindsay
// November 12th, 2025
//
// Extra for Experts:
//  - Working in binary, and preforming bitwise operations.
//  - Working with high degree polynomials stored as arrays.
//  - Manipulating data and converting between data types (binary to decimal, etc.).
//  - There arent many code elements that weren't taught in class, but this project uses a combination of the basic concepts to get the result I am looking for.

// Most of the theory behind this is from Thonky.com's QR code tutorial: https://www.thonky.com/qr-code-tutorial/
// And this video: https://www.youtube.com/watch?v=w5ebcowAJD8

let cellSize;
let input;
let website;
let grid = [];
let maskApplied = false; // state variable to make sure the mask only applies once and doesnt unapply when generating another code.
const GRID_SIZE = 29;
const WHITE_PIXEL = 0;
const BLACK_PIXEL = 1;
const EMPTY_PIXEL = 2;
const RESERVED_WHITE_PIXEL = 3;
const RESERVED_BLACK_PIXEL = 4;
const REQUIRED_BITS = 440; // this depends on QR version and error correction level, which I am making constant for this project.
const CODEWORD_AMOUNT = 55; // this is also constant for this QR type.

// function to preload files.
function preload() {
  emptyQR = loadJSON("empty-qr.json"); // this json has all the constant QR patterns, like the finder patterns, timing bits, and alignment pattern.
}

// setup function
function setup() {
  createCanvas(windowWidth * 0.70, windowHeight * 0.70);
  if (width < height) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
  
  grid = generateEmptyQRCode(GRID_SIZE);
  
  noStroke();
  takeInput();
}

// draw loop
function draw() {
  displayQRCode();
}

// function to take user input - this code is from this video: https://www.youtube.com/watch?v=JeXqaKeJSRI 
function takeInput() {
  let button = document.getElementById("generateButton"); // get the button element in the html code.
  button.onclick = function() { // when the button is clicked, generate a QR code with the website that was entered.
    website = document.getElementById("input").value + " ";
    grid = generateEmptyQRCode(GRID_SIZE);
    generateQRCode(website);
  };
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
      else if (grid[y][x] === EMPTY_PIXEL) {
        fill(150);
      }
      else if (grid[y][x] === RESERVED_WHITE_PIXEL) {
        fill(255);
      }
      else if (grid[y][x] === RESERVED_BLACK_PIXEL) {
        fill(0);
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
  let finalDataString = binaryString + errorCorrectionBits; // + errorCorrectionBits;
  let bitCount = 0; // a counter for the number of bits displayed.

  for (let x = Math.floor(GRID_SIZE/2); x >= 0; x--) { // split x into 2 wide columns.
    if (x % 2 === 0) {
      bitCount = upwardPlacement(finalDataString, bitCount, x*2); // place bits in an upward column if x is even, and then update bitCount.
    }
    else if (x % 2 !== 0) {
      bitCount = downwardPlacement(finalDataString, bitCount, x*2); // place bits in an downward column if x is odd, and then update bitCount.
    }
  }

  applyMask(); // applies mask 0 to try and break up clusters of pixels.
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
  
  binaryString = bytePadding(binaryString);
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
  let remainingBits = REQUIRED_BITS - binaryString.length; // calculates how many more bits need to be filled.

  if (remainingBits <= 4) { // if there are 4 or less bits left to fill, it adds zeroes until it is the correct length (terminator bits).
    for (let i = 0; i < remainingBits; i++) {
      binaryString = binaryString + "0";
    }
  }
  else { // if there are more than 4 bits left to fill, it adds the terminator bits and a repeating pattern of padding bytes.
    binaryString = binaryString + "0000"; // terminator bits.
    remainingBits = REQUIRED_BITS - binaryString.length;
    let remainingBytes = remainingBits/8; // converts the remaining bits from bits to bytes.

    for (let i = 0; i < remainingBytes; i++) {
      if (i % 2 === 0) {
        binaryString = binaryString + "11101100"; // first padding byte, added for the even bytes.
      }
      else {
        binaryString = binaryString + "00010001"; // second padding byte, added for the odd bytes.
      }
    }
  }
  
  return binaryString;
}

// function to generate the error correction codewords for the QR code.
function calculateErrorCorrection(binaryString) {
  let errorCorrectionCodeWords = "";
  let messagePolynomial = generateMessagePolynomial(binaryString); // generate a message polynomial for the input data.
  let codeWords = generateECC(messagePolynomial); // generate the error correction codewords.

  for (let i = 0; i < codeWords.length; i++) { // convert the codewords into bytes.
    let byte = [0, 0, 0, 0, 0, 0, 0, 0];
    let charCode = codeWords[i].toString(2); 
    codeWords[i] = charCode;
    
    for (let j = 0; j < charCode.length; j++) {
      byte.pop(); 
    }
    
    codeWords[i] = byte.join("") + codeWords[i];
  }
  
  for (let i = 0; i < codeWords.length; i++) { // add the codewords to a string.
    errorCorrectionCodeWords = errorCorrectionCodeWords + codeWords[i];
  }
  
  return errorCorrectionCodeWords; // return the codewords.
}

// function to create a message polynomial for the binary string.
function generateMessagePolynomial(binaryString) {
  let messagePolynomial = [];
  
  for (let i = 0; i < binaryString.length / 8; i++) { // split the binary string back into bytes and store it in an array.
    messagePolynomial.push(binaryString.substring(i*8, i*8 + 8));
  }
  
  for (let i = 0; i < messagePolynomial.length; i++) { // convert each byte back into decimal.
    messagePolynomial[i] = parseInt(messagePolynomial[i], 2);
  }
  
  for (let i = 0; i < 15; i++) {
    messagePolynomial.push(0);
  }

  return messagePolynomial;
}

// function to generate the error correction bits.
function generateECC(messagePolynomial) {

  for (let i = 0; i < CODEWORD_AMOUNT; i++) { // repeat the division 55 times to get a remainder with 15 coefficients which are the error correction bits.
    let generatorPolynomial = [1, 29, 196, 111, 163, 112, 74, 10, 105, 105, 139, 132, 151, 32, 134, 26]; // this is the generator polynomial, which is constant for this QR type.
    let leadTerm = messagePolynomial[0]; // define the new lead term of the previous iteration.

    for (let j = 0; j < generatorPolynomial.length; j++) {
      generatorPolynomial[j] = convertToExponent(generatorPolynomial[j]) + convertToExponent(leadTerm); // multiply the polynomials by adding their exponents in alpha notation.
      if (generatorPolynomial[j] > 255) { // mod the exponent if it is above 255.
        generatorPolynomial[j] = generatorPolynomial[j] % 255;
      }
      messagePolynomial[j] = messagePolynomial[j] ^ convertToInteger(generatorPolynomial[j]); // convert the exponent back to integer notation and XOR with the message polynomial coefficient.
    }

    messagePolynomial.splice(0, 1); // remove the first term, which is now empty.
  }

  return messagePolynomial; // return the remaining 15 coefficients of the message polynomial.
}

// the convertToExponent and convertToInteger functions are NOT MY CODE, I adapted them from https://github.com/Nika03/log-antilog-table/blob/main/index.js to save time because I was struggling to figure out how to calculate the log and antilog values.
function convertToExponent(integerToConvert) {
  let exp = [];
  let integer = 0;
  let xored;
  let pow = 1;
  
  for (let i = 0; i < 256; i++) {
    if (integer <= 256 && i <= 8) {
      integer = 2 ** i;
    }

    if (i > 8 && integer <= 255) {
      integer = xored * 2 ** pow;
      pow++;
    }

    if (integer > 255) {
      integer = integer ^ 285;
      xored = integer;
      pow = 1;
    }
    exp.push(integer);
  } 

  return exp.findIndex((element) => element === integerToConvert);
}

// the convertToExponent and convertToInteger functions are NOT MY CODE, I adapted them from https://github.com/Nika03/log-antilog-table/blob/main/index.js to save time because I was struggling to figure out how to calculate the log and antilog values.
function convertToInteger(exponentToConvert) {
  let exp = [];
  let integer = 0;
  let xored;
  let pow = 1;
  
  for (let i = 0; i < 256; i++) {
    if (integer <= 256 && i <= 8) {
      integer = 2 ** i;
    }

    if (i > 8 && integer <= 255) {
      integer = xored * 2 ** pow;
      pow++;
    }

    if (integer > 255) {
      integer = integer ^ 285;
      xored = integer;
      pow = 1;
    }
    exp.push(integer);
  } 

  return exp[exponentToConvert];
}

// function for placing bits in an upward column.
function upwardPlacement(finalDataString, bitCount, x) {
  let y = 28;

  while (y >= 0) { // places the data bits in a zigzag pattern going upwards.
    if (grid[y][x] === EMPTY_PIXEL) {
      grid[y][x] = int(finalDataString[bitCount]); // sets the current location on the grid to the corresponding data bit.
      bitCount++; // update bitCount.
    }
    x--; // move left.
    if (grid[y][x] === EMPTY_PIXEL) { // place another bit.
      grid[y][x] = int(finalDataString[bitCount]);
      bitCount++;
    }
    y--; // move up.
    x++; // move right.
  }

  return bitCount;
}

// function for placing bits in an downward column.
function downwardPlacement(finalDataString, bitCount, x) {
  let y = 0;

  while (y <= 28) { // places the data bits in a zigzag pattern going downwards.
    if (x === 6) { // skips over the timing pattern on x = 6.
      x--;
    }
    if (grid[y][x] === EMPTY_PIXEL) {
      grid[y][x] = int(finalDataString[bitCount]); // sets the current location on the grid to the corresponding data bit.
      bitCount++; // update bitCount.
    }
    x--; // move left.
    if (grid[y][x] === EMPTY_PIXEL) { // place another bit.
      grid[y][x] = int(finalDataString[bitCount]); 
      bitCount++;
    }
    y++; // move down.
    x++; // move right.
  }

  return bitCount;
}

// function to apply a mask to the QR code (only mask 0).
function applyMask() {
  if (maskApplied === false) {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if ((x + y) % 2 === 0) { // only change even pixels to invert pixels in a checkerboard pattern.
          if (grid[y][x] === WHITE_PIXEL) { // flip pixel from white to black.
            grid[y][x] = BLACK_PIXEL;
          }
          else if (grid[y][x] === BLACK_PIXEL) { // flip pixel from black to white.
            grid[y][x] = WHITE_PIXEL;
          }
        }
      }
    }
    maskApplied = true; // once the mask is applied, it wont apply it again to prevent flipping between masked and not masked.
  }
}