// Arrays and Objects
// Graham Lindsay
// October 26th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theParticles = [];
let isPaused = false;
const RECT_MARGIN = 100;
const RADIUS = 50;
const PARTICLE_SPACING = 20;
const PARTICLE_SIZE = 20;
const GRAVITY = 0.45;
const ENERGY_LOSS = 0.6;


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  // noStroke();

  // set up the particle array
  for (let x = RECT_MARGIN * 4; x < width - RECT_MARGIN * 4; x += PARTICLE_SIZE + PARTICLE_SPACING) {
    for (let y = RECT_MARGIN * 4; y < height - RECT_MARGIN * 4; y += PARTICLE_SIZE + PARTICLE_SPACING) {
      let someParticle = spawnParticle(x, y);
      theParticles.push(someParticle);  
    }
  }
} 

function draw() {
  drawUserInterface();
  drawParticles();
  wallCollisions();
  if (isPaused === false) {
    moveParticles();
  }
}

function drawUserInterface() {
  background(220);
  push();
  fill(255);
  rect(RECT_MARGIN, RECT_MARGIN, width - RECT_MARGIN * 2, height - RECT_MARGIN * 2 - PARTICLE_SPACING);
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
  for (let particle of theParticles) {
    let velocity = Math.sqrt(particle.dy * particle.dy + particle.dx * particle.dx);
    fill(color(225 - velocity * 10, 255, 255));
    circle(particle.x, particle.y, PARTICLE_SIZE);
  }
}

function moveParticles() {
  for (let particle of theParticles) {
    particle.dy += GRAVITY;
    particle.x += particle.dx;
    particle.y += particle.dy;
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
      if (particle.y > height - RECT_MARGIN - PARTICLE_SIZE) {
        particle.y = height - RECT_MARGIN - PARTICLE_SIZE;
      }
      else {
        particle.y = RECT_MARGIN + PARTICLE_SIZE;
      }
    } 
  }
}

function calculateDensity() {
  let density = 0;
  let mass = 1;

  for (let particle of theParticles) {
    let distance;
    let influence = max(0, 0.5 - distance);
    density += mass * influence;
  }

  return density;
}

function mousePressed() {
  if (isPaused === false) {
    for (let particle of theParticles) {
      if (mouseX > RECT_MARGIN && mouseX < width - RECT_MARGIN && mouseY > RECT_MARGIN && mouseY < height - RECT_MARGIN) {
        if (mouseButton === LEFT) {
          particle.dy = particle.dy + random(35);
        }
        if (mouseButton === CENTER) {
          r = RADIUS * sqrt(random(0, 1));
          theta = random(0, 1) * 2 * PI;
          particle.x = mouseX + r * cos(theta);
          particle.y = mouseY + r * sin(theta);
          particle.dx = particle.dx + random(-8, 8);
          particle.dy = particle.dy + random(-8, 8);
        }
      }
    }
  }
}

function keyPressed() {
  isPaused = !isPaused;
}