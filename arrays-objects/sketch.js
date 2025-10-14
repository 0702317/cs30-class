// Arrays and Objects
// Graham Lindsay
// October 26th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theParticles = [];
const particleSpacing = 100;
const particleSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noStroke();

  // set up the particle array
  for (let x = 0; x < width; x += particleSpacing) {
    for (let y = 0; y < height; y += particleSpacing) {
      let someParticle = spawnParticle(x, y);
      theParticles.push(someParticle);
    }
  }
}

function draw() {
  background(220);

  for (let someParticle of theParticles) {
    circle(someParticle.xPos, someParticle.yPos, particleSize);
  }
}

function spawnParticle(x, y) {
  let particle;

  particle = {
    xPos: x,
    yPos: y,
  };

  return particle;
}