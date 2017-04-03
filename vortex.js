/* .vortex */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var points = [];
var hexagons = [];

var numsquares = 64;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      pixelDensity(1);
  }

  var info = document.getElementById("infolink");
  info.style.color="#000000";

  var info = document.getElementById("saucelink");
  info.style.color="#000000";

  var shuffle = document.getElementById("shuffleimg");
  shuffle.src="assets/shuffle_black.png";

  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < numsquares; i++) {
    points.push(map(i, 0, numsquares, 0, PI/2));
    hexagons.push(new Hexagon(map(i, 0, i+1, height*2, 0)));
  }
}

function draw() {
  background(255);

  noStroke();
  for (var i = 0; i < points.length; i++) {
    if (i%2 == 1) fill(0);
    else fill(255);
    push();
    translate(width/2, height/2);
    rotate(sin(points[i])*TWO_PI);
    hexagons[i].display();
    pop();

    points[i] += 0.02;
  }
}

function Hexagon(d) {

  this.points = [];

  for (var i = 0; i < 6; i++) {
    this.a = map(i, 0, 6, 0, TWO_PI);
    this.points[i] = createVector(cos(this.a)*d, sin(this.a)*d, this.a);
  }

  this.display = function() {
    beginShape();

    for (var i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }

    endShape(CLOSE);
  }
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
    sketchname = createA("https://www.openprocessing.org/sketch/389854");
    sketchname.style('font-family', 'sourceCode-extralight');
    sketchname.style('font-size', '1.5em');
    sketchname.id('thisurl');
    sketchname.style('color', '#199393');
    sketchname.style('position', 'absolute');
    sketchname.style('text-decoration', 'underline');
    sketchname.style('margin-right', '-50%');
    sketchname.style('top', '85%');
    sketchname.style('left', '50%');
    sketchname.style('text-align', 'center');
    sketchname.style('transform', 'translate(-50%, -50%)');

    document.getElementById('thisurl').innerHTML = "twirling.Tunnel";
    document.getElementById('thisurl').setAttribute('target', '_blank');
}

function fadeTitle() {
    if (millis() > 5000 && titleOpacity > 0) {
        titleOpacity -= 0.025;
    }
    sketchname.style('opacity', '' + titleOpacity);
    if (titleOpacity < 0.025) {
        sketchname.hide();
    }
}
