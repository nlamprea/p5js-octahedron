let vertices4D = [
  [1, 0, 0, 0],
  [-1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, -1, 0],
  [0, 0, 0, 1],
  [0, 0, 0, -1]
];

let edges = [
  [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
  [2, 4], [2, 5], [2, 6], [2, 7],
  [3, 4], [3, 5], [3, 6], [3, 7]
];

let angle = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);

  // Rotar los puntos en múltiples planos del espacio 4D
  let rotatedVertices = vertices4D.map(v => rotate4D(v, angle, 0, 1));
  rotatedVertices = rotatedVertices.map(v => rotate4D(v, angle, 1, 2));
  rotatedVertices = rotatedVertices.map(v => rotate4D(v, angle, 2, 3));
  rotatedVertices = rotatedVertices.map(v => rotate4D(v, angle, 0, 3));

  // Proyectar los puntos 4D a 3D y luego a 2D
  let projected3D = rotatedVertices.map(project4Dto3D);
  let projected2D = projected3D.map(project3Dto2D);

  // Dibujar las aristas con color azul transparente
  stroke(0, 0, 255, 100); // Azul transparente
  for (let edge of edges) {
    let [start, end] = edge;
    let [x1, y1] = projected2D[start];
    let [x2, y2] = projected2D[end];
    line(x1, y1, x2, y2);
  }

  // Dibujar los vértices con color amarillo
  fill(255, 255, 0); // Amarillo
  noStroke();
  for (let vertex of projected2D) {
    ellipse(vertex[0], vertex[1], 8, 8);
  }

  // Incrementar el ángulo de rotación
  angle += 0.01;
}

function project4Dto3D(point4D) {
  return [point4D[0], point4D[1], point4D[2]];
}

function project3Dto2D(point3D) {
  let distance = 2;
  let z = 1 / (distance - point3D[2]);
  let x = point3D[0] * z;
  let y = point3D[1] * z;
  return [x * width / 2 + width / 2, y * height / 2 + height / 2];
}

function rotate4D(point, angle, axis1, axis2) {
  let sinAngle = sin(angle);
  let cosAngle = cos(angle);
  let rotated = [...point];
  rotated[axis1] = point[axis1] * cosAngle - point[axis2] * sinAngle;
  rotated[axis2] = point[axis1] * sinAngle + point[axis2] * cosAngle;
  return rotated;
}
