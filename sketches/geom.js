var points = [];
var angles = [];

var symmetry = 20;
var theta;
var circleSpace;
var cDim;
var rot = 0;
var mode;
var bmode;

var speed;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  rot = 0;
  speed = 5;
  symmetry = floor((Math.random() * 23) + 1);
  theta = floor((Math.random() * 31) + 1);
  circleSpace = (Math.random() * 249) + 1;
  cDim = (Math.random() * 150) + 50;

  mode = floor((Math.random() * 8) + 1);
  bmode = floor((Math.random() * 2) + 1);

  points = [];

  for (var j = 0; j < symmetry; j++) {
    var a = map(j, 0, symmetry * theta, 0, Math.PI * 2);
    points.push(createVector(cos(a) * circleSpace, sin(a) * circleSpace, a));
    angles.push(a);
  }

  colorMode(HSB, 360);

  background(0);
}

function draw() {
  for (var i = 0; i < speed; i++) {
    if (rot <= Math.PI * 2) {
      sketch();
    }
  }
}

function sketch() {
  push();
  translate(width / 2, height / 2);
  rotate(rot);

  for (var i = 0; i < points.length; i++) {
    var c = color(0 + abs(cos(angles[i]) * 360), 100, 360, 3);
    push();
    translate(points[i].x, points[i].y);
    rotate(points[i].z);
    noFill();
    stroke(c, 5);
    rectMode(CENTER);

    if (mode == 1) {
      rect(0, 0, abs(sin(points[i].z)) * cDim, abs(cos(points[i].z) * cDim));
    } else if (mode == 2) {
      rect(0, 0, abs(sin(points[i].z)) * cDim, abs(sin(points[i].z) * cDim));
    } else if (mode == 3) {
      rect(0, 0, abs(sin(points[i].z)) * cDim, abs(tan(points[i].z) * (cDim / 10)));
    } else if (mode == 4) {
      rect(0, 0, 1 / abs(sin(points[i].z)) * cDim, abs(1 / cos(points[i].z) * cDim));
    } else if (mode == 5) {
      rect(0, 0, 1 / abs(sin(points[i].z)) * cDim, abs(1 / sin(points[i].z) * cDim));
    } else if (mode == 6) {
      rect(0, 0, 1 / abs(sin(points[i].z)) * cDim, abs(1 / tan(points[i].z) * (cDim / 10)));
    } else if (mode == 7) {
      rect(0, 0, map(abs(cos(points[i].z)), 0, 1, 0.5, 1) * cDim, map(abs(cos(points[i].z)), 0, 1, 0.5, 1) * cDim);
    } else if (mode == 8) {
      rect(0, 0, map(abs(cos(points[i].z)), 0, 1, 0.5, 1) * cDim, map(abs(sin(points[i].z)), 0, 1, 0.5, 1) * cDim);
    }

    pop();
    points[i].z += 0.025;
    angles[i] += 0.025;
  }
  pop();

  rot += 0.01;
}
