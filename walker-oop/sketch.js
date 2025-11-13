// Walker OOP demo
// Graham Lindsay
// Nov. 13th, 2025

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 10;
    this.radius = 5;
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    let choice = random(0, 100);
    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }
}

let theWalkers = [];
let ro = new Walker(200, 300, "green");
let noor = new Walker(400, 500, "red");

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  for (let myWalker of theWalkers) {
    myWalker.move();
    myWalker.display();
  }
}

function spawnWalker(x, y) {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let someColor = color(r, g, b);
  let someWalker = new Walker(x, y, someColor);
  theWalkers.push(someWalker);
}

function mousePressed() {
  spawnWalker(mouseX, mouseY);
}