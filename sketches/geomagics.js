/* .geomagics */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

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
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    pixelDensity(1);
    var shfl = select('#shuffleimg');
    shfl.hide();
  }

  createCanvas(windowWidth, windowHeight);

  // create the title
  createTitle();

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
  // fade the title
  fadeTitle();

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
    stroke(c, 25);
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

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    sketchname = createA("https://www.openprocessing.org/sketch/386759");
    sketchname.style('font-family', 'sourceCode-extralight');
    sketchname.style('font-size', '3em');
    sketchname.id('thisurl');
    sketchname.style('color', '#f54949');
    sketchname.style('position', 'absolute');
    sketchname.style('text-decoration', 'underline');
    sketchname.style('margin-right', '-50%');
    sketchname.style('top', '85%');
    sketchname.style('left', '50%');
    sketchname.style('text-align', 'center');
    sketchname.style('transform', 'translate(-50%, -50%)');

    document.getElementById('thisurl').innerHTML = "geomagics";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ simple algorithmic drawings ]");
    sketchdescription.style('font-family', 'sourceCode-extralight');
    sketchdescription.style('font-size', '1.5em');
    sketchdescription.id('thisurl');
    sketchdescription.style('color', '#ffffff');
    sketchdescription.style('position', 'absolute');
    sketchdescription.style('margin-right', '-50%');
    sketchdescription.style('top', '87.5%');
    sketchdescription.style('left', '50%');
    sketchdescription.style('text-align', 'center');
    sketchdescription.style('transform', 'translate(-50%, -50%)');

    document.getElementById('sourced').style.fontSize = "2em";
    document.getElementById('kessond').style.fontSize = "2em";
  } else {
    sketchname = createA("https://www.openprocessing.org/sketch/386759");
    sketchname.style('font-family', 'sourceCode-extralight');
    sketchname.style('font-size', '1.5em');
    sketchname.id('thisurl');
    sketchname.style('color', '#f54949');
    sketchname.style('position', 'absolute');
    sketchname.style('text-decoration', 'underline');
    sketchname.style('margin-right', '-50%');
    sketchname.style('top', '85%');
    sketchname.style('left', '50%');
    sketchname.style('text-align', 'center');
    sketchname.style('transform', 'translate(-50%, -50%)');

    document.getElementById('thisurl').innerHTML = "geomagics";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ simple algorithmic drawings ]");
    sketchdescription.style('font-family', 'sourceCode-extralight');
    sketchdescription.style('font-size', '0.8em');
    sketchdescription.id('thisurl');
    sketchdescription.style('color', '#ffffff');
    sketchdescription.style('position', 'absolute');
    sketchdescription.style('margin-right', '-50%');
    sketchdescription.style('top', '87.5%');
    sketchdescription.style('left', '50%');
    sketchdescription.style('text-align', 'center');
    sketchdescription.style('transform', 'translate(-50%, -50%)');
  }
}

function fadeTitle() {
  if (millis() > 5000 && titleOpacity > 0) {
    titleOpacity -= 0.025;
  }
  sketchname.style('opacity', '' + titleOpacity);
  sketchdescription.style('opacity', '' + titleOpacity);
  if (titleOpacity < 0.025) {
    sketchname.hide();
    sketchdescription.hide();
  }
}
