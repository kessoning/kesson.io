/* .mathemagics */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var points = [];

var m = 4 + Math.random()*28;
var n = 2 + Math.random()*2;
var dim = 200 + Math.random()*400;
var vel = 0.01;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function setup() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      pixelDensity(1);
      var shfl = select('#shuffleimg');
      shfl.hide();
  }
  
  createCanvas(windowWidth, windowHeight);

  // create the title
  createTitle();

  reset();
}

function draw() {
  // fade the title
  fadeTitle();

  background(0);

  for (var i = 0; i < points.length; i++) {
    push();
    translate(points[i].x, points[i].y);
    rotate(points[i].z);
    noFill();
    stroke(255);
    rectMode(CENTER);
    rect(0, 0, abs(cos(points[i].z))*dim, abs(cos(points[i].z)*dim));
    pop();
    points[i].z -= vel;
  }
}

function reset() {
  points = [];
  for (var i = 0; i < m; i++) {
    var aa = map(i, 0, m*n, 0, Math.PI*2);
    points.push(createVector(width/2, height/2, aa));
  }
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      sketchname = createA("https://www.openprocessing.org/sketch/385996");
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

      document.getElementById('thisurl').innerHTML = "mathemagics";
      document.getElementById('thisurl').setAttribute('target', '_blank');

      document.getElementById('sourced').style.fontSize = "2em";
      document.getElementById('kessond').style.fontSize = "2em";
  } else {
      sketchname = createA("https://www.openprocessing.org/sketch/385996");
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

      document.getElementById('thisurl').innerHTML = "mathemagics";
      document.getElementById('thisurl').setAttribute('target', '_blank');
  }
}

function fadeTitle() {
  if (millis() > 5000 && titleOpacity > 0) { titleOpacity -= 0.025;}
  sketchname.style('opacity', '' + titleOpacity);
  if (titleOpacity < 0.025) sketchname.hide();
}
