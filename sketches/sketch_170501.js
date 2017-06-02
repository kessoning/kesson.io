/* .sketch_170501 */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: May 2016

var points = [];

var cols, rows;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  cols = width/25;
  rows = height/25;

  for (var i = 0; i < cols; i++) {
    points[i] = [];
  }

  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      points[x][y] = createVector(map(x, 0, cols, width*0.1, width*0.9), map(y, 0, rows, height*0.1, height*0.9), map(x*y, 0, cols*rows, 0, Math.PI*2));
    }
  }
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  createTitle();

  cols = width/25;
  rows = height/25;

  for (var i = 0; i < cols; i++) {
    points[i] = [];
  }

  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      points[x][y] = createVector(map(x, 0, cols, width*0.1, width*0.9), map(y, 0, rows, height*0.1, height*0.9), map(x*y, 0, cols*rows, 0, Math.PI*2));
    }
  }
}

function draw() {
  fadeTitle();

  background(0);

  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      push();
      fill(255);
      noStroke();
      ellipseMode(CORNER);
      translate(cos(points[x][y].z)*50, sin(points[x][y].z)*50);
      ellipse(points[x][y].x, points[x][y].y, abs(cos(points[x][y].z))*cols/5, abs(cos(points[x][y].z))*cols/5);
      points[x][y].z += 0.01;
      pop();
    }
  }
}


// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    sketchname = createA("https://www.openprocessing.org/sketch/424641");
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

    document.getElementById('thisurl').innerHTML = "sketch_170501";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ simple math animation ]");
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
    sketchname = createA("https://www.openprocessing.org/sketch/424641");
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

    document.getElementById('thisurl').innerHTML = "sketch_170501";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ simple math animation ]");
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
