// Arrays and Objects
// Graham Lindsay
// October 26th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theParticles = [];
const RECT_MARGIN = 100;
const PARTICLE_SPACING = 3;
const PARTICLE_SIZE = 10;
const GRAVITY = 0.3;
const ENERGY_LOSS = 0.7;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noStroke();

  // set up the particle array
  for (let x = 400; x < width - 400; x += PARTICLE_SIZE + PARTICLE_SPACING) {
    for (let y = 400; y < height - 400; y += PARTICLE_SIZE + PARTICLE_SPACING) {
      let someParticle = spawnParticle(x, y);
      theParticles.push(someParticle);  
    }
  }
} 

function draw() {
  drawUserInterface();
  drawParticles();
  moveParticles();
  wallCollisions();
}

function drawUserInterface() {
  background(220);
  push();
  fill(255);
  rect(100, 100, width - 200, height - 200);
  pop();
}

function spawnParticle(_x, _y) {
  let particle = {
    x: _x,
    y: _y,
    dx: random(-3, 3),
    dy: random(-3, 3),
    r: 144,
    g: 213,
    b: 255,
  };

  return particle;
}

function drawParticles() {
  for (let someParticle of theParticles) {
    fill(someParticle.r, someParticle.g, someParticle.b);
    circle(someParticle.x, someParticle.y, PARTICLE_SIZE);
  }
}

function moveParticles() {
  for (let particle of theParticles) {
    particle.dy += GRAVITY;
    if (particle.x < width - RECT_MARGIN - PARTICLE_SIZE/2 && particle.x > RECT_MARGIN + PARTICLE_SIZE/2) {
      particle.x += particle.dx;
    }
    if (particle.y < height - RECT_MARGIN - PARTICLE_SIZE/2 && particle.y > RECT_MARGIN + PARTICLE_SIZE/2) {
      particle.y += particle.dy;
    }
  }
}

function wallCollisions() {
  for (let particle of theParticles) {
    if (particle.x < RECT_MARGIN + PARTICLE_SIZE || particle.x > width - RECT_MARGIN - PARTICLE_SIZE) {
      particle.dx = -particle.dx;
    } 
    if (particle.y < RECT_MARGIN + PARTICLE_SIZE || particle.y > height - RECT_MARGIN - PARTICLE_SIZE) {
      particle.dy = -particle.dy;
      particle.dy = particle.dy * ENERGY_LOSS;
      particle.dx = particle.dx * ENERGY_LOSS;
      particle.y = height - RECT_MARGIN - PARTICLE_SIZE;
    } 
  }
}

function mousePressed() {
  for (let particle of theParticles) {
    // if (particle.x > mouseX - random(175) && particle.x < mouseX + random(175)) {
    //   particle.dy = particle.dy + random(25);
    // }
    if (mouseX > RECT_MARGIN && mouseX < width - RECT_MARGIN && mouseY > RECT_MARGIN && mouseY < height - RECT_MARGIN) {
      if (mouseButton === LEFT) {
        particle.dy = particle.dy + random(25);
      }
      if (mouseButton === CENTER) {
        particle.x = mouseX + random(-10, 10);
        particle.y = mouseY + random(-5, 5);
        particle.dx = particle.dx + random(-6, 6);
        particle.dy = particle.dy + random(-6, 6);
      }
    }
  }
}