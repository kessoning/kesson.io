/* .mandalaGenerator */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var points = [];
var hmpoints = [];
var vmpoints = [];
var hvmpoints = [];

var noiseVector;
var nvnoise;
var makeNoise = false;

var hmirror = false;
var vmirror = false;

var guiControls;
var datGUI;

var horizontalMirror;
var verticalMirror;
var makeNoise = true;

var backgroundColor = "#000000";
var linesColor = "#ffffff";

var symmetry = 1+Math.random()*11;;
var strokeThickness = 1;
var strokeAlpha = 10;
var pointsSize = 0;
var maxDistance = 50+Math.random()*150;

var pg;

function preload() {
  font = loadFont("assets/SourceCodePro-ExtraLight.ttf");
}

function setup() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      pixelDensity(1);
  }
  createCanvas(windowWidth, windowHeight);

  // create the title
  createTitle();

  pg = createGraphics(width, height);

  colorMode(HSB);

  if (Math.random() > 0.5) {
    horizontalMirror = true;
  } else {
    horizontalMirror = false;
  }

  if (Math.random() > 0.5) {
    verticalMirror = true;
  } else {
    verticalMirror = false;
  }

  noiseVector = createVector(width / 2, height / 2);
  nvn = createVector(random(10), random(10));

  background(backgroundColor);
}

function draw() {
  // fade the title
  fadeTitle();

  background(backgroundColor);

  if (makeNoise) {
    sketchNoise();
  }

  for (var i = 0; i < symmetry; i++) {
    push();
    imageMode(CENTER);
    translate(width/2, height/2);
    rotate(i*TWO_PI/symmetry);
    image(pg, 0, 0, width, height);
    pop();
  }

  if (frameCount > 100) {
    noLoop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function sketchNoise() {
  noiseVector.x += map(noise(nvn.x), 0, 1, -width / 40, width / 40);
  noiseVector.y += map(noise(nvn.y), 0, 1, -width / 40, width / 40);

  if (noiseVector.x < width * 0.1 || noiseVector.x > width * 0.9) {
    noiseVector.x = width / 2;
  }

  if (noiseVector.y < height * 0.1 || noiseVector.y > height * 0.9) {
    noiseVector.y = height / 2;
  }

  nvn.x += 0.1;
  nvn.y += 0.1;

  var c = color(linesColor);

  var p = createVector(noiseVector.x, noiseVector.y);

  pg.fill(red(c), green(c), blue(c), 100);
  pg.noStroke();
  pg.ellipse(p.x, p.y, pointsSize, pointsSize);

  for (var i = 0; i < points.length; i++) {
    if (dist(p.x, p.y, points[i].x, points[i].y) < maxDistance) {
      pg.stroke(red(c), green(c), blue(c), strokeAlpha);
      pg.strokeWeight(strokeThickness);
      pg.line(p.x, p.y, points[i].x, points[i].y);
    }
  }

  append(points, createVector(noiseVector.x, noiseVector.y));

  if (horizontalMirror) {
    var hp = createVector(width - noiseVector.x, noiseVector.y);

    for (var j = 0; j < hmpoints.length; j++) {
      if (dist(hp.x, hp.y, hmpoints[j].x, hmpoints[j].y) < maxDistance) {
        pg.stroke(red(c), green(c), blue(c), strokeAlpha);
        pg.strokeWeight(strokeThickness);
        pg.line(hp.x, hp.y, hmpoints[j].x, hmpoints[j].y);
      }
    }

    append(hmpoints, createVector(width - noiseVector.x, noiseVector.y));
  }

  if (verticalMirror) {
    var vp = createVector(noiseVector.x, height - noiseVector.y);

    for (var k = 0; k < vmpoints.length; k++) {
      if (dist(vp.x, vp.y, vmpoints[k].x, vmpoints[k].y) < maxDistance) {
        pg.stroke(red(c), green(c), blue(c), strokeAlpha);
        pg.strokeWeight(strokeThickness);
        pg.line(vp.x, vp.y, vmpoints[k].x, vmpoints[k].y);
      }
    }

    append(vmpoints, createVector(noiseVector.x, height - noiseVector.y));
  }

  if (verticalMirror && horizontalMirror) {
    var hvp = createVector(width - noiseVector.x, height - noiseVector.y);

    for (var l = 0; l < hvmpoints.length; l++) {
      if (dist(hvp.x, hvp.y, hvmpoints[l].x, hvmpoints[l].y) < maxDistance) {
        pg.stroke(red(c), green(c), blue(c), strokeAlpha);
        pg.strokeWeight(strokeThickness);
        pg.line(hvp.x, hvp.y, hvmpoints[l].x, hvmpoints[l].y);
      }
    }

    append(hvmpoints, createVector(width - noiseVector.x, height - noiseVector.y));
  }
}

function addRandomPoints() {
  var a = random(128, 1024);

  for (var i = 0; i < a; i++) {
    var x = random(width * 0.1, width * 0.9);
    var y = random(height * 0.1, height * 0.9);
    append(points, createVector(x, y));
    append(hmpoints, createVector(width - x, y));
    append(vmpoints, createVector(x, height - y));
    append(hvmpoints, createVector(width - x, height - y));
  }
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
  sketchname = createA("http://www.kesson.io/mandala.html");
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

  document.getElementById('thisurl').innerHTML = "mandalaGenerator";
  document.getElementById('thisurl').setAttribute('target', '_blank');
}

function fadeTitle() {
  if (millis() > 5000 && titleOpacity > 0) { titleOpacity -= 0.025;}
  sketchname.style('opacity', '' + titleOpacity);
  if (titleOpacity < 0.025) sketchname.hide();
}
