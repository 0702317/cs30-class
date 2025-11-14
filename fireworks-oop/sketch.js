// Fireworks OOP demo
// Graham Lindsay
// November 14th, 2025

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-10, 10);
    this.dy = random(-10, 10);
    this.radius = 3;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.opacity--;
  }

  isDead() {
    return this.opacity <= 0;
  }
}

let theFireworks = [];
const NUMBER_OF_FIREWORKS = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (someFirework of theFireworks) {
    if (someFirework.isDead()) {
      let index = theFireworks.indexOf(someFirework);
      theFireworks.splice(index, 1);
    }
    else {
      someFirework.display();
      someFirework.update();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < NUMBER_OF_FIREWORKS; i++) {
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}

function keyPressed() {
  for (let i = 0; i < NUMBER_OF_FIREWORKS; i++) {
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}