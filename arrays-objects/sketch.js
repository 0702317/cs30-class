// Arrays and Objects
// Graham Lindsay
// October 26th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theParticles = [];
const particleDensity = 20;
const particleSize = 12;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noStroke();

  // set up the particle array
  for (let x = width / (particleDensity + particleSize); x < width - width / (particleDensity + particleSize); x += particleDensity) {
    for (let y = height / (particleDensity + particleSize); y < height - height / (particleDensity + particleSize); y += particleDensity) {
      let someParticle = spawnParticle(x, y);
      theParticles.push(someParticle);
    }
  }
}

function draw() {
  background(220);
  rect(20, 20, width - 40, height - 40);

  for (let someParticle of theParticles) {
    fill(someParticle.r, someParticle.g, someParticle.b);
    circle(someParticle.xPos, someParticle.yPos, particleSize);
  }
}

function spawnParticle(x, y) {
  let particle;

  particle = {
    xPos: x,
    yPos: y,
    dx: 0,
    dy: 0,
    r: 255,
    g: 255,
    b: 255,
  };

  return particle;
}