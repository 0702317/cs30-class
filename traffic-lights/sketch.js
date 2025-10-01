// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let lightColour = "red";
let waitTime = 8000;
let lastSwitched = 0;

function setup() {
  createCanvas(400, 800);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  showCorrectLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(245, 190, 41);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(100);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  ellipse(width / 2, height / 2, 50, 50); //middle
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}

function showCorrectLight() {
  if (lightColour === "red") {
    fill("red");
    ellipse(width / 2, height / 2 - 65, 50, 50); //top
    if (millis() > lastSwitched + waitTime) {
      lastSwitched = millis();
      lightColour = "green";
    }
  }

  if (lightColour === "yellow") {
    fill("yellow");
    ellipse(width / 2, height / 2, 50, 50); //middle
    if (millis() > lastSwitched + 2000) {
      lastSwitched = millis();
      lightColour = "red";
    }
  }
  
  if (lightColour === "green") {
    fill("green");
    ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
    if (millis() > lastSwitched + waitTime) {
      lastSwitched = millis();
      lightColour = "yellow";
    }
  }
}