// Connected Nodes OOP Demo
// Graham Lindsay
// November 18th, 2025

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10);

  // draw lines first
  for (let node of nodes) {
    node.update();
    node.connectTo(nodes);
  }

  // draw cirlces after
  for (let node of nodes) {
    node.display();
  }
}

function keyPressed() {
  for (let i = 0; i < 5; i++) {
    let somePoint = new MovingPoint(mouseX, mouseY);
    nodes.push(somePoint);
  }
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.05;
    this.radius = 15;
    this.speed = 0;
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.reach = 250;
    this.maxRadius = 40;
    this.minRadius = 10;
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeByMouse();
  }

  adjustSizeByMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else {
      this.radius = this.minRadius;
    }
  }

  connectTo(nodesArray) {
    for (let otherNode of nodesArray) {
      if (this !== otherNode) {
        let distanceAway = dist(this.x, this.y, otherNode.x, otherNode.y);
        if (distanceAway < this.reach) {
          stroke(this.color);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }
    }
  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale from 0-1 to movement speed
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    // move point
    this.x += dx;
    this.y += dy;

    // move on the time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen() {
    if (this.x < 0) {
      this.x += width;
    }
    if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    }
    if (this.y > width) {
      this.y -= height;
    }
  }

}
