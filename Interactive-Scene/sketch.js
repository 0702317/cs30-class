// Interactive Scene Project
// Graham Lindsay
// September 29th, 2025
// 
// Extra for Experts:
//  - Mouse Wheel Interaction: zoom in and out.
//  - Made a 3D game using WEBGL instead of 2D.
//  - Used arrays to store data.
//  - Used vectors to store position data.
//  - I tried really hard to make it so that blocks can be placed and destroyed, but I was not able to get it working in time. I have left what I did in the code so you can see it.

let gameState = "start"; // sets the game state to the start screen.
let inControl = false; // changes if the player has clicked on the screen.
let cam;
let fov = 50;
let maxFov = 90;
let minFov = 20;
let sens = 0.005;
let speed = 10;
let gravity = 10;
let floorLevel = 300;
let boxSize = 200;
let gridSize = 16; // edge length of the grid (number of boxes).
let gridHeight = 1;

let grid = [];

// preload function.
function preload() { // loads in the font file.
  font = loadFont("times.ttf");
}

// runs on startup
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  textSize(26);
  textAlign(CENTER);
  cam = createCamera();
  cam.setPosition(0, 0, 300);
  cam.lookAt(0, -height/2, 0);
}  

// continuous loop
function draw() {
  if (gameState === "start") { // shows the start screen at the beginning.
    drawStartScreen();
    if (keyIsPressed) { // when the player presses a key it changes to the game.
      gameState = "game";
      cam.lookAt(0, windowHeight/2, 0);
      cam.setPosition(cam.eyeX, -floorLevel, cam.eyeZ);
    }
  }

  if (gameState === "game") { // switches to the game view.
    background(0, 0, 50);
    keyInputs();
    moveCamera();
    createGrid();
  }
}

// function to create the start screen
function drawStartScreen() {
  background(50);
    cam.lookAt(0, 0, 0);
    text("PRESS ANY KEY TO START", 0, 0)
    push();
    textSize(10);
    translate(0, 50, 0);
    text("W A S D, to move, up and down arrow to change grid size, left and right arrow to change grid height, and mouse scroll wheel to zoom in and out.", 0, 0);
    pop();
    push();
    textSize(7);
    translate(0, 75, 0);
    text("Click the scren to hide cursor.", 0, 0);
    pop();
}

// function to generate the 3d grid of boxes using nested loops.
function createGrid() {
  translate(0, boxSize/2, 0);
  for (y = 0; y < gridHeight; y++) {
    for (x = 0; x < gridSize; x++) {
      for (z = 0; z < gridSize; z ++) {
        box(boxSize);
        translate(0, 0, boxSize);
        let pos = createVector(
          x * boxSize,
          y * boxSize,
          z * boxSize,
        )
        let newBlock = {
          pos: pos,
        };
        grid.push(newBlock);
      }
      translate(boxSize, 0, -boxSize * gridSize);
    }
    translate(-boxSize * gridSize, boxSize, 0);
  }
}

function keyInputs() { // wasd move controls and gravity. If I do this again I would like to try and find a better way to implement movement.
  if (keyIsDown(65) === true) {
    cam.move(-speed, 0, 0);
    cam.setPosition(cam.eyeX, -floorLevel, cam.eyeZ);
  }

  if (keyIsDown(68) === true) {
    cam.move(speed, 0, 0);
    cam.setPosition(cam.eyeX, -floorLevel, cam.eyeZ);
  }

  if (keyIsDown(87) === true) {
    cam.move(0, 0, -speed);
    cam.setPosition(cam.eyeX, -floorLevel, cam.eyeZ);
  }

  if (keyIsDown(83) === true) {
    cam.move(0, 0, speed);
    cam.setPosition(cam.eyeX, -floorLevel, cam.eyeZ);
  }

  if (keyIsDown(38) === true) { // up arrow increases grid size.
    gridSize++
  }

  if (keyIsDown(40) === true) { // down arrow decreases grid size.
    gridSize--;
  }

  if (keyIsDown(39) === true) { // right arrow increases grid height.
    gridHeight++;
  }

  if (keyIsDown(37) === true) { // left arrow decreases grid height.
    gridHeight--;
  }
}

// trying to get destroying blocks to work.
//
//   if (keyIsDown(32) === true) {
//     for(i = 0; i < gridSize; i++) {
//       console.log(grid[i].z);
//       if (cam.centerZ > grid[i].pos.z && cam.centerZ < grid[i + 1].pos.z) {
//          grid[i].hide();
//       }
//     }
//   }
// }

// function to move the camera to where the mouse is.
function moveCamera() {
  if (inControl === true) {
    yaw = cam.pan(movedX * -sens); // moves the camera left and right with the mouse.
    pitch = cam.tilt(movedY * sens); // moves the camera up and down with the mouse.
    cam.camera(cam.eyeX, cam.eyeY, cam.eyeZ, cam.centerX, cam.centerY, cam.centerZ, 0, 1, 0); // locks the camera in the upright position.
  }

  if (cam.eyeY < -floorLevel) { // moves the player down to floor level.
    cam.move(0, gravity, 0);
  }
}

// function to hide the cursor when the player clicks the screen.
function mouseClicked() {
  requestPointerLock();
  inControl = true;
}

// functuion to allow the player to zoom in and out using the mouse wheel.
function mouseWheel(event) {
  if (event.delta > 0) {
    if (fov < maxFov) { // increases fov if fov is less than the max fov.
      fov += 3;
    }
    perspective(radians(fov));
  } 
  else {
    perspective(radians(fov));
    if (fov > minFov) { // decreases fov if fov is more than the min fov.
      fov -= 3;
    }
  }
}