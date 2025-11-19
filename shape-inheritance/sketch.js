// Shape Inheritance OOP Demo
// Graham Lindsay
// November 19th, 2025

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    let choice = random(100);
    if (choice < 50) {
      let theColor = color(random(255), random(255), random(255));
      let aShape = new Circle(random(width), random(height), theColor, random(20, 50));
      shapes.push(aShape);
    }
    else {
      let theColor = color(random(255), random(255), random(255));
      let aShape = new Square(random(width), random(height), theColor, random(20, 50));
      shapes.push(aShape);
    }
  }
}

function draw() {
  background(220);
  for (let shape of shapes) {
    shape.display();
    shape.move();
  }
}

class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  display() {
    fill(this.color);
    noStroke();
  }

  move() {
    this.x += random(-9, 9);
    this.y += random(-9, 9);
  }
}

class Circle extends Shape {
  constructor(x, y, color, radius) {
    super(x, y, color);
    this.radius = radius;
  }

  display() {
    super.display();
    circle(this.x, this.y, this.radius*2);
  }
}

class Square extends Shape {
  constructor(x, y, color, sideLength) {
    super(x, y, color);
    this.sideLength = sideLength;
  }

  display() {
    super.display();
    rectMode(CENTER);
    square(this.x, this.y, this.sideLength);
  }
}