let currentView = 'menu';

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  
  let button600Cell = select('#button600Cell');
  button600Cell.mousePressed(() => {
    currentView = '600-cell';
    setup600Cell();
  });

  let buttonOtherCode = select('#OCTAHEDRON');
  buttonOtherCode.mousePressed(() => {
    currentView = 'OCTAHEDRON';
    setupOtahedron();
  });
}

function draw() {
  if (currentView === 'menu') {
    background(220);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Menú', width / 2, height / 2);
  } else if (currentView === '600-cell') {
    draw600Cell();
  } else if (currentView === 'OCTAHEDRON') {
    drawOctahedron();
  }
}
