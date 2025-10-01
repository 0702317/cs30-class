// Interactive Scene Project
// Graham Lindsay
// September 29th, 2025
// 
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "game";
let cam;
let fov = 50;
let sens = 0.005;
let inControl = false;
let speed = 10;
let jumpHeight = 50;
let gravity = 10;
let floorLevel = 300;
let boxSize = 200;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(400, -500, 800);
  cam.lookAt(0, -height/2, 0);
  debugMode();
}  
  
function draw() {
  if (gameState === "start") {
    background(255, 0, 0);
  }

  if (gameState === "game") {
    background(0, 0, 50);
    movementKeys();
    moveCamera();
    sceneObjects();
  }
}

function sceneObjects() {
  push();
  translate(0, boxSize/2, 0);
  for (x = 0; x < 4; x++) {
    translate(boxSize, 0, 0);
    for (z = 0; z < 4; z ++) {
      box(boxSize, boxSize, boxSize);
      translate(0, 0, boxSize);
      rotateY(radians(180));
    }
  }
  pop();
  
  // push();
  // rotateX(PI/2);
  // fill(150);
  // translate(0, 0, -100);
  // plane(15000);
  // pop();
}

function movementKeys() { 
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
  
  if (cam.eyeY < -floorLevel) {
    cam.move(0, gravity, 0);
  }
}

function moveCamera() {
  if (inControl === true) {
    yaw = cam.pan(movedX * -sens); // moves the camera left and right with the mouse
    pitch = cam.tilt(movedY * sens); // moves the camera up and down with the mouse
    cam.camera(cam.eyeX, cam.eyeY, cam.eyeZ, cam.centerX, cam.centerY, cam.centerZ, 0, 1, 0); // locks the camera in the upright position
  }
}

function mouseClicked() { // hides the cursor when the player clicks on the screen
  requestPointerLock();
  inControl = true;
}

function mouseWheel(event) { // allows the player to zoom in and out using the mouse wheel
  if (event.delta > 0) {
    if (fov < 90) {
      fov += 3;
    }
    perspective(radians(fov));
  } 
  else {
    perspective(radians(fov));
    if (fov > 20) {
      fov -= 3;
    }
  }
}