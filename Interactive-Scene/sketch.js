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
  for (i = 0; i < 10; i++) {
    pop();
    box(200, 200, 200);
    translate(200, 0, 0);
    push();
  }
  
  rotateX(PI/2);
  fill(150);
  translate(0, 0, -100);
  plane(15000);
  pop();
}

function movementKeys() { 
  if (keyIsDown(65) === true) {
    cam.move(-speed, 0, 0);
    cam.setPosition(cam.eyeX, -300, cam.eyeZ);
  }

  if (keyIsDown(68) === true) {
    cam.move(speed, 0, 0);
    cam.setPosition(cam.eyeX, -300, cam.eyeZ);
  }

  if (keyIsDown(87) === true) {
    cam.move(0, 0, -speed);
    cam.setPosition(cam.eyeX, -300, cam.eyeZ);
  }

  if (keyIsDown(83) === true) {
    cam.move(0, 0, speed);
    cam.setPosition(cam.eyeX, -300, cam.eyeZ);
  }
  
  if (cam.eyeY < -300) {
    cam.move(0, gravity, 0);
  }
}

function moveCamera() {
  if (inControl === true) {
    yaw = cam.pan(movedX * -sens);
    pitch = cam.tilt(movedY * sens);
    cam.camera(cam.eyeX, cam.eyeY, cam.eyeZ, cam.centerX, cam.centerY, cam.centerZ, 0, 1, 0);
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