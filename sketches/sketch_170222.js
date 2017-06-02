var shp = [];

var x = [];
var y = [];
var nx = [];
var ny = [];
var a = [];

var numobjects = 1 + Math.random()*99;

function setup() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var shfl = select('#shuffleimg');
    shfl.hide();
  }

  var info = document.getElementById("infolink");
  info.style.color = "#000000";

  var info = document.getElementById("saucelink");
  info.style.color = "#000000";

  var shuffle = document.getElementById("shuffleimg");
  shuffle.src = "assets/shuffle_black.png";

  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  createTitle();

  for (var i = 0; i < numobjects; i++) {
    x.push(width / 2);
    y.push(height / 2);
    nx.push(Math.random()*10);
    ny.push(Math.random()*10);
    a.push(0);
    shp.push(new Shape());
  }

  for (var i = 0; i < shp.length; i++) {
    shp[i].init();
  }

  background(255);
}

function draw() {
  console.log(frameRate());

  for (var i = 0; i < shp.length; i++) {
    push();

    translate(x[i], y[i]);
    shp[i].display();

    x[i] += map(noise(nx[i]), 0, 1, -1, 1) * (numobjects/10);
    y[i] += map(noise(ny[i]), 0, 1, -1, 1) * (numobjects/10);

    nx[i] += Math.random() / 10;
    ny[i] += Math.random() / 10;

    pop();
  }
}

function Shape() {

  this.points = [];
  this.npoints = [];
  this.numpoints = 3 + Math.random() * 8;
  this.dim = Math.random()*width/5;

  this.init = function() {
    for (var i = 0; i < this.numpoints; i++) {
      var a = map(i, 0, this.numpoints, 0, Math.PI * 2);
      this.points.push(createVector(Math.cos(a) * this.dim, Math.sin(a) * this.dim, Math.random() * (Math.PI * 2)));
      this.npoints.push(createVector(Math.cos(a) * this.dim, Math.sin(a) * this.dim, Math.random() * (Math.PI * 2)));
    }
  }

  this.deform = function(x, y) {
    for (var i = 0; i < points.size(); i++) {
      if (dist(this.points[i].x, this.points[i].y, this.npoints[i].x, this.npoints[i].y) > 30) this.points[i].z += Math.PI;
    }
  }

  this.display = function() {
    stroke(0, 10);
    noFill();

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
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        sketchname = createA("https://www.openprocessing.org/sketch/419831");
        sketchname.style('font-family', 'sourceCode-extralight');
        sketchname.style('font-size', '3em');
        sketchname.id('thisurl');
        sketchname.style('color', '#199393');
        sketchname.style('position', 'absolute');
        sketchname.style('text-decoration', 'underline');
        sketchname.style('margin-right', '-50%');
        sketchname.style('top', '85%');
        sketchname.style('left', '50%');
        sketchname.style('text-align', 'center');
        sketchname.style('transform', 'translate(-50%, -50%)');

        document.getElementById('thisurl').innerHTML = "sketch_170222";
        document.getElementById('thisurl').setAttribute('target', '_blank');
        document.getElementById('sourced').style.fontSize = "2em";
        document.getElementById('kessond').style.fontSize = "2em";
    } else {
        sketchname = createA("https://www.openprocessing.org/sketch/419831");
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

        document.getElementById('thisurl').innerHTML = "sketch_170222";
        document.getElementById('thisurl').setAttribute('target', '_blank');
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
