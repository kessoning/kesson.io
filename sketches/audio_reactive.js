/* simple.audio.reactive */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: May 2016

var mic, fft;

var r, rr;

var pos = [];
var noises = [];
var shp = [];

var nx = Math.random() * 1000;
var ny = Math.random() * 1000;

var numcount = 0;

var bg;

function setup() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      var shfl = select('#shuffleimg');
      shfl.hide();
  }

  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  createTitle();

  var info = document.getElementById("infolink");
  info.style.color = "#555555";

  var info = document.getElementById("saucelink");
  info.style.color = "#555555";

  var shuffle = document.getElementById("shuffleimg");
  shuffle.src = "assets/shuffle_black.png";

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.001);
  fft.setInput(mic);

  colorMode(HSB, 360);

  r = 0;
  bg = 0;

  for (var i = 0; i < 8; i++) {
    var c = map(i, 0, 8, 0, TWO_PI);
    var s = new Shape(16, map(i, 0, 8, height / 20, height*1.5), c);
    var p = createVector(width / 2, height / 2, random(Math.PI * 2));
    var n = createVector(random(Math.PI*2), random(Math.PI*2));
    shp.push(s);
    pos.push(p);
    noises.push(n);
  }

  background(360);
}

function draw() {
  fadeTitle();

  blendMode(NORMAL);
  fill(90 + abs(Math.cos(bg))*90, 20, 360, 360);
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height / 2, width, height);

  bg += 0.01;

  var spectrum = fft.analyze();

  for (var i = 0; i < shp.length; i++) {
    var d = map(i, 0, shp.length, height/20, height*1.5);
    push();
    translate(width / 2, height / 2);
    blendMode(MULTIPLY);
    shp[i].move(spectrum, i, d);
    shp[i].display();
    pop();

    blendMode(NORMAL);

    pos[i].x += map(noise(noises[i].x), 0, 1, -3, 3);
    pos[i].y += map(noise(noises[i].y), 0, 1, -3, 3);
    nx += random(0.01, 0.05);
    ny += random(0.01, 0.05);

    if (dist(pos[i].x, pos[i].y, width / 2, height / 2) > width / 3) {
      pos[i].x = width / 2;
      pos[i].y = height / 2;
    }
  }
}

function Shape(r, d, c) {

  this.points = [];
  this.noises = [];

  this.res = r;
  this.dim = d;

  this.col = c;

  this.r = 0;

  for (var i = 0; i < this.res; i++) {
    var a = map(i, 0, this.res, 0, Math.PI * 2);
    var p = createVector(cos(a) * this.dim, sin(a) * this.dim, a);
    var n = createVector(i / this.res, this.res / (i + 1));
    this.points.push(p);
    this.noises.push(n);
  }

  this.move = function(spectrum, c, d) {
    for (var i = 0; i < this.points.length; i++) {
      var a = map(i, 0, this.points.length, 0, Math.PI * 2);
      var d = this.dim * map(noise(this.points[i].z, this.noises[i].x), 0, 1, 0.5, 1);
      var t = (spectrum[i]*(c+1) + this.points.length)%256;
      var dim = d;
      dim += noise(i/80) * spectrum[t];
      this.points[i].x = Math.cos(a) * dim;
      this.points[i].y = Math.sin(a) * dim;
    }
  }

  this.display = function() {
    noFill();

    stroke(90 + (abs(Math.cos(this.col))*180), 200, 200, 50);
    //this.col += 0.01;
    fill(90 + (this.col * 180), 200, 200, 50);
    strokeWeight(2);

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
        sketchname = createA("https://www.openprocessing.org/sketch/425701");
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

        document.getElementById('thisurl').innerHTML = "simple.audio.reactive";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ audio reactive sketch ]");
        sketchdescription.style('font-family', 'sourceCode-extralight');
        sketchdescription.style('font-size', '1.5em');
        sketchdescription.id('thisurl');
        sketchdescription.style('color', '#000000');
        sketchdescription.style('position', 'absolute');
        sketchdescription.style('margin-right', '-50%');
        sketchdescription.style('top', '87.5%');
        sketchdescription.style('left', '50%');
        sketchdescription.style('text-align', 'center');
        sketchdescription.style('transform', 'translate(-50%, -50%)');

        document.getElementById('sourced').style.fontSize = "2em";
        document.getElementById('kessond').style.fontSize = "2em";
    } else {
        sketchname = createA("https://www.openprocessing.org/sketch/425701");
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

        document.getElementById('thisurl').innerHTML = "simple.audio.reactive";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ audio reactive sketch ]");
        sketchdescription.style('font-family', 'sourceCode-extralight');
        sketchdescription.style('font-size', '0.8em');
        sketchdescription.id('thisurl');
        sketchdescription.style('color', '#000000');
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
