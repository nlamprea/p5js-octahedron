function createGeometry() {
    octahedron = new p5.Geometry();
    octahedron.vertices = [   
      new p5.Vector(0, 0, 100),
      new p5.Vector(50, 50, 0),
      new p5.Vector(50, -50, 0),
      new p5.Vector(-50, -50, 0),
      new p5.Vector(-50, 50, 0),
      new p5.Vector(0, 0, -100),
    ];
  
    octahedron.faces = [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 1],
      [5, 4, 3],
      [5, 3, 2],
      [5, 2, 1],
      [5, 1, 4],
    ];
  }
  