// Arrays and Objects
// Graham Lindsay
// October 26th, 2025
//
// Extra for Experts:
//  - HSB colour mode to create colour gradients and change colour based on velocity
//  - Researched more advanced fluid simulation methods like the navier-stokes equation.

let theParticles = [];
let isPaused = false;
let isGravity = true;
const RECT_MARGIN = 100;
const TEXT_SIZE = 50;
const MOUSE_RADIUS = 50;
const PARTICLE_SPACING = 15;
const PARTICLE_SIZE = 10;
const GRAVITY = 0.45;
const ENERGY_LOSS = 0.6;

// setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  // set up the particle array
  for (let x = RECT_MARGIN * 4; x < width - RECT_MARGIN * 4; x += PARTICLE_SIZE + PARTICLE_SPACING) {
    for (let y = RECT_MARGIN * 4; y < height - RECT_MARGIN * 4; y += PARTICLE_SIZE + PARTICLE_SPACING) {
      let someParticle = spawnParticle(x, y);
      theParticles.push(someParticle);  
    }
  }
} 

// draw loop
function draw() {
  drawUserInterface();
  drawParticles();
  wallCollisions();
  if (isPaused === false) { // does not move particles if game is paused
    moveParticles();
  }
}

// funtion to draw rectangle and text
function drawUserInterface() {
  background(220);
  push();
  fill(255);
  rect(RECT_MARGIN, RECT_MARGIN, width - RECT_MARGIN * 2, height - RECT_MARGIN * 2 - PARTICLE_SIZE/2);
  pop();
  if (isPaused) { // text that shows up if game is paused
    push();
    fill(0);
    textSize(TEXT_SIZE);
    text("PAUSED", width/2 - TEXT_SIZE*2, height - RECT_MARGIN/2);
    pop();
  }
}

// funtion to create a particle
function spawnParticle(_x, _y) {
  let particle = {
    x: _x,
    y: _y,
    dx: random(-3, 3),
    dy: random(-3, 3),
  };
  
  return particle;
}

// function to draw the particles
function drawParticles() {
  for (let particle of theParticles) {
    let velocity = sqrt(particle.dy * particle.dy + particle.dx * particle.dx); // calculates velocity of each particle
    fill(color(225 - velocity * 10, 255, 255)); // sets the particles colour based on velocity
    circle(particle.x, particle.y, PARTICLE_SIZE);
  }
}

// function to apply gravity and move the particles
function moveParticles() {
  for (let particle of theParticles) {
    if (isGravity) {
      particle.dy += GRAVITY;
    }
    particle.x += particle.dx;
    particle.y += particle.dy;
  }
}

// function for handling wall collisions and bouncing
function wallCollisions() {
  for (let particle of theParticles) {
    if (particle.x < RECT_MARGIN + PARTICLE_SIZE || particle.x > width - RECT_MARGIN - PARTICLE_SIZE) { // bounce off left and right
      particle.dx = -particle.dx;
    } 
    if (particle.y < RECT_MARGIN + PARTICLE_SIZE || particle.y > height - RECT_MARGIN - PARTICLE_SIZE) { // bounce off top and bottom
      particle.dy = -particle.dy;
      particle.dy = particle.dy * ENERGY_LOSS; // decreases y speed when the ball bounces
      particle.dx = particle.dx * ENERGY_LOSS; // decreases x speed when the ball bounces
      if (particle.y > height - RECT_MARGIN - PARTICLE_SIZE) { // sets y position to prevent particles clipping through walls
        particle.y = height - RECT_MARGIN - PARTICLE_SIZE;
      }
      else {
        particle.y = RECT_MARGIN + PARTICLE_SIZE;
      }
    } 
  }
}

// function calculateDensity() {
//   let density = 0;
//   let mass = 1;

//   for (let particle of theParticles) {
//     let distance;
//     let influence = max(0, 0.5 - distance);
//     density += mass * influence;
//   }

//   return density;
// }

// function to handle keyboard inputs
function keyPressed() {
  if (keyCode === 32) { // toggles pause when spacebar is pressed
    isPaused = !isPaused;
  }
  if (keyCode === 71 && !isPaused) {
    isGravity = !isGravity;
  }
}

// function for the different mouse inputs
function mousePressed() {
  if (!isPaused) {
    for (let particle of theParticles) {
      if (mouseX > RECT_MARGIN && mouseX < width - RECT_MARGIN && mouseY > RECT_MARGIN && mouseY < height - RECT_MARGIN) { // can only use mouse inputs inside the rectangle
        if (mouseButton === LEFT) { // applies a random y force to every particle
          particle.dy = particle.dy + random(35);
        }
        if (mouseButton === CENTER) { // creates a circle of particles around the mouse pointer
          let r = MOUSE_RADIUS * sqrt(random(0, 1));
          theta = random(0, 1) * 2 * PI;
          particle.x = mouseX + r * cos(theta); // sets x position to a random position inside the circle
          particle.y = mouseY + r * sin(theta); // sets y position to a random position inside the circle
          particle.dx = particle.dx + random(-8, 8);
          particle.dy = particle.dy + random(-8, 8);
        }
      }
    }
  }
}