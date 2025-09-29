// Interactive Scene
// Graham Lindsay
// September 29th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cam;
let fov = 50;
let sens = 0.005;
let inControl = false;
let speed = 10;
let jumpHeight = 50;
let gravity = 9.81;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(400, -400, 800);
  cam.lookAt(0, -height/2, 0);
  debugMode();

}  
  
function draw() {
  background(0, 0, 50);
  movementKeys();
  moveCamera();
  sceneObjects();
}

function sceneObjects() {
  push();
  rotateX(PI/2);
  fill(150);
  translate(0, 0, -100);
  plane(15000);
  pop();
}

function mouseWheel(event) {
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

function movementKeys() {
  if (keyIsDown(65) === true) {
    cam.move(-speed, 0, 0);
    cam.setPosition(cam.eyeX, -100, cam.eyeZ);
  }

  if (keyIsDown(68) === true) {
    cam.move(speed, 0, 0);
    cam.setPosition(cam.eyeX, -100, cam.eyeZ);
  }

  if (keyIsDown(87) === true) {
    cam.move(0, 0, -speed);
    cam.setPosition(cam.eyeX, -100, cam.eyeZ);
  }

  if (keyIsDown(83) === true) {
    cam.move(0, 0, speed);
    cam.setPosition(cam.eyeX, -100, cam.eyeZ);
  }
  
  if (cam.eyeY < -100) {
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

function mouseClicked() {
  requestPointerLock();
  inControl = true;
}
