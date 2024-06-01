let vertices4D1 = [
  [1, 0, 0, 0],
  [-1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, -1, 0],
  [0, 0, 0, 1],
  [0, 0, 0, -1]
];

let edges1 = [
  [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
  [2, 4], [2, 5], [2, 6], [2, 7],
  [3, 4], [3, 5], [3, 6], [3, 7],
  [4, 6], [4, 7],
  [5, 6], [5, 7]
];

let angle1 = 0;

function setupOtahedron() {
  createCanvas(600, 600);
}

function drawOctahedron() {
  background(220);
  //translate(width / 2, height / 2);

  // Rotar los puntos en múltiples planos del espacio 4D
  let rotatedVertices1 = vertices4D1.map(v => rotate4D1(v, angle1, 0, 1));
  rotatedVertices1 = rotatedVertices1.map(v => rotate4D1(v, angle1, 1, 2));
  rotatedVertices1 = rotatedVertices1.map(v => rotate4D1(v, angle1, 2, 3));
  rotatedVertices1 = rotatedVertices1.map(v => rotate4D1(v, angle1, 0, 3));

  // Proyectar los puntos 4D a 3D y luego a 2D
  let projected3D1 = rotatedVertices1.map(project4Dto3D1);
  let projected2D1 = projected3D1.map(project3Dto2D1);

  // Dibujar las aristas con color azul transparente
  stroke(0, 0, 255, 100);
  for (let edge of edges1) {
    let [start1, end1] = edge;
    let [x11, y11] = projected2D1[start1];
    let [x21, y21] = projected2D1[end1];
    line(x11, y11, x21, y21);
  }

  // Dibujar los vértices con color amarillo
  fill(255, 255, 0);
  noStroke();
  for (let vertex of projected2D1) {
    ellipse(vertex[0], vertex[1], 8, 8);
  }

  // Incrementar el ángulo de rotación
  angle1 += 0.01;
}

function project4Dto3D1(point4D) {
  return [point4D[0], point4D[1], point4D[2]];
}

function project3Dto2D1(point3D) {
  let distance = 2;
  let z = 1 / (distance - point3D[2]);
  let x = point3D[0] * z;
  let y = point3D[1] * z;
  return [x * width / 2 + width / 2, y * height / 2 + height / 2];
}

function rotate4D1(point, angle, axis1, axis2) {
  let sinAngle1 = sin(angle);
  let cosAngle1 = cos(angle);
  let rotated1 = [...point];
  rotated1[axis1] = point[axis1] * cosAngle1 - point[axis2] * sinAngle1;
  rotated1[axis2] = point[axis1] * sinAngle1 + point[axis2] * cosAngle1;
  return rotated1;
}
