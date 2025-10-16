// Arrays and Objects
// Graham Lindsay
// October 26th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theParticles = [];
const PARTICLE_DENSITY = 5;
const PARTICLE_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noStroke();

  // set up the particle array
  for (let x = 0; x < width; x += PARTICLE_SIZE + PARTICLE_DENSITY) {
    for (let y = 0; y < height; y += PARTICLE_SIZE + PARTICLE_DENSITY) {
      let someParticle = spawnParticle(x, y);
      theParticles.push(someParticle);
    }
  }
}

function draw() {
  background(220);
  for (let someParticle of theParticles) {
    fill(someParticle.r, someParticle.g, someParticle.b);
    circle(someParticle.x, someParticle.y, PARTICLE_SIZE);
  }
  moveParticles();
}

function spawnParticle(_x, _y) {
  let particle = {
    x: _x,
    y: _y,
    dx: random(-3, 3),
    dy: random(-3, 3),
    r: 255,
    g: 255,
    b: 255,
  };

  return particle;
}

function moveParticles() {
  for (let particle of theParticles) {
    particle.x += particle.dx;
    particle.y += particle.dy;
  }
}