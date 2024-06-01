let vertices4D = [];
let edges = [];
let faces = [];
let angleX = 0;
let angleY = 0;
let angleZ = 0;
let camX = 0;
let camY = 0;
let camZ = 0;
let lastMouseX, lastMouseY;
let dragging = false;

function setup600Cell() {
  vertices4D = [];
  edges = [];
  faces = [];
  angleX = 0;
  angleY = 0;
  angleZ = 0;
  camX = 0;
  camY = 0;
  camZ = 0;
  lastMouseX = undefined;
  lastMouseY = undefined;
  dragging = false;
  generate600CellVertices();
}

function draw600Cell() {
  background(220);
  translate(width / 2, height / 2);

  let rotatedVertices = vertices4D.map(v => rotate4D(v, angleX, 0, 1));
  rotatedVertices = rotatedVertices.map(v => rotate4D(v, angleY, 1, 2));
  rotatedVertices = rotatedVertices.map(v => rotate4D(v, angleZ, 2, 3));
  rotatedVertices = rotatedVertices.map(v => rotate4D(v, angleX, 0, 3));

  // Proyectar los puntos 4D a 3D y luego a 2D
  let projected3D = rotatedVertices.map(project4Dto3D);
  let projected2D = projected3D.map(project3Dto2D);

  // Escalar la proyección para una mejor visualización
  projected2D = projected2D.map(([x, y]) => [x * 200, y * 200]);

  noStroke();
  fill(0, 0, 255, 100);
  for (let face of faces) {
    beginShape();
    for (let vertexIndex of face) {
      let [x, y] = projected2D[vertexIndex];
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  stroke(0, 0, 255, 100);
  for (let edge of edges) {
    let [start, end] = edge;
    let [x1, y1] = projected2D[start];
    let [x2, y2] = projected2D[end];
    line(x1, y1, x2, y2);
  }

  fill(255, 255, 0);
  noStroke();
  for (let vertex of projected2D) {
    ellipse(vertex[0], vertex[1], 8, 8);
  }

  // Actualizar ángulos para la rotación automática
  angleX += 0.01;
  angleY += 0.01;
  angleZ += 0.01;
}

function generate600CellVertices() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const vertices = [
    [1, 1, 1, 1], [1, 1, 1, -1], [1, 1, -1, 1], [1, 1, -1, -1],
    [1, -1, 1, 1], [1, -1, 1, -1], [1, -1, -1, 1], [1, -1, -1, -1],
    [-1, 1, 1, 1], [-1, 1, 1, -1], [-1, 1, -1, 1], [-1, 1, -1, -1],
    [-1, -1, 1, 1], [-1, -1, 1, -1], [-1, -1, -1, 1], [-1, -1, -1, -1],
    [0, 0, 2, 2], [0, 0, 2, -2], [0, 0, -2, 2], [0, 0, -2, -2],
    [0, 2, 0, 2], [0, 2, 0, -2], [0, -2, 0, 2], [0, -2, 0, -2],
    [2, 0, 0, 2], [2, 0, 0, -2], [-2, 0, 0, 2], [-2, 0, 0, -2],
    [2, 2, 0, 0], [2, -2, 0, 0], [-2, 2, 0, 0], [-2, -2, 0, 0],
    [2, 0, 2, 0], [2, 0, -2, 0], [-2, 0, 2, 0], [-2, 0, -2, 0],
    [0, 2, 2, 0], [0, 2, -2, 0], [0, -2, 2, 0], [0, -2, -2, 0],
    [1, phi, 0, 0], [-1, phi, 0, 0], [1, -phi, 0, 0], [-1, -phi, 0, 0],
    [phi, 0, 1, 0], [-phi, 0, 1, 0], [phi, 0, -1, 0], [-phi, 0, -1, 0],
    [0, 1, phi, 0], [0, -1, phi, 0], [0, 1, -phi, 0], [0, -1, -phi, 0],
    [0, 0, 1, phi], [0, 0, -1, phi], [0, 0, 1, -phi], [0, 0, -1, -phi]
  ];

  vertices4D = vertices;

  // Generar aristas
  for (let i = 0; i < vertices4D.length; i++) {
    for (let j = i + 1; j < vertices4D.length; j++) {
      if (distance4D(vertices4D[i], vertices4D[j]) < 2.1) {
        edges.push([i, j]);
      }
    }
  }
}

function distance4D(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2 +
    (a[3] - b[3]) ** 2
  );
}

function project4Dto3D(point4D) {
  return [point4D[0], point4D[1], point4D[2]];
}

function project3Dto2D(point3D) {
  let distance = 3;
  let z = 1 / (distance - point3D[2]);
  let x = point3D[0] * z;
  let y = point3D[1] * z;
  return [x, y];
}

function rotate4D(point, angle, axis1, axis2) {
  let sinAngle = sin(angle);
  let cosAngle = cos(angle);
  let rotated = [...point];
  rotated[axis1] = point[axis1] * cosAngle - point[axis2] * sinAngle;
  rotated[axis2] = point[axis1] * sinAngle + point[axis2] * cosAngle;
  return rotated;
}
