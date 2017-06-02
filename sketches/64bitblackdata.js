/* .64bit.BLACK_DATA */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: June 2016

var particles = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (var i = 0; i < particles.length; i++) {
    particles[i].x = random(width*0.25, width*0.75);
  }
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  background(0);

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      var shfl = select('#shuffleimg');
      shfl.hide();
  }

  // create the title
  createTitle();

  for (var i = 0; i < 64; i++) {
    particles.push(createVector(random(width*0.25, width*0.75), random(height), random(TWO_PI)));
  }
}

function draw() {
  // fade the title
  fadeTitle();

  fill(0, 15);
  noStroke();
  rectMode(CENTER);
  rect(width/2, height/2, width, height);

  translate(0, height/2);

  for (var i = 0; i < particles.length; i++) {
    stroke(255);
    point(particles[i].x, particles[i].y);

    for (var j = 0; j < particles.length; j++) {
      if (particles[i].dist(particles[j]) < 50) {
        stroke(255, 5);
        line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
      }
    }

    particles[i].y = tan(particles[i].z);

    var dist = abs(0 - particles[i].y);
    var vel = map(dist, 0, 1500, 0.01, 0.000000001);
    particles[i].z += vel;

    if (particles[i].y > height/2) {
      particles[i].x = random(width*0.25, width*0.75);
    }
  }
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    sketchname = createA("https://www.openprocessing.org/sketch/432323");
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

    document.getElementById('thisurl').innerHTML = "64bit.BLACK_DATA";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ \"[...] bright lattices of logic unfolding across that colorless void.\" ]");
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
    sketchname = createA("https://www.openprocessing.org/sketch/432323");
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

    document.getElementById('thisurl').innerHTML = "64bit.BLACK_DATA";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ \"[...] bright lattices of logic unfolding across that colorless void.\" ]");
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
    if (titleOpacity < 0.025) sketchname.hide();
}
