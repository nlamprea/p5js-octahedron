let octahedron;
let rotX = -0.2;
let rotY = -0.8;

function setup() {
  createCanvas(400, 400, WEBGL);
  background(0);
  createGeometry();
  stroke(180, 0, 0);
  fill(255, 0, 0);
  rotateX(rotX);
  rotateY(-rotY);
  model(octahedron);
  permit_draw = false;
}

function draw() {
    background(0);
    //lights();
    directionalLight(255, 255, 250, 0, 0, -1);
    pointLight(255, 255, 255, 0, 0, -.1);
    ambientLight(200);
    //rotateY(millis() * 0.002);
    rotateX(rotX);
    rotateY(-rotY);
    fill(255, 0, 0);
    model(octahedron);
  
}

function mouseDragged() {
  rotY -= (mouseX - pmouseX) * 0.01;
  rotX -= (mouseY - pmouseY) * 0.01;
}
