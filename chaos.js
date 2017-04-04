/* .chaos */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var points = [];
var acceleration = [];
var velocity = [];

var topspeed;
var pointsdimension;
var numpoints;
var center_gravity;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    center_gravity.x = width / 2;
    center_gravity.y = height / 2;
}

function setup() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        pixelDensity(1);
    }

    createCanvas(windowWidth, windowHeight);

    // create the title
    createTitle();

    topspeed = 10 + Math.random() * 20;
    numpoints = 500 + Math.random() * 3500;
    pointsdimension = 0.5 + Math.random();
    center_gravity = createVector(width / 2, height / 2);

    for (var i = 0; i < numpoints; i++) {
        points.push(createVector(random(width), random(height)));
        acceleration.push(createVector(0, 0));
        velocity.push(createVector(0, 0));
    }
}

function draw() {
    // fade the title
    fadeTitle();

    background(0);
    move();
    view();
}

function move() {
    for (var i = 0; i < numpoints; i++) {
        acceleration[i] = p5.Vector.sub(center_gravity, points[i]);
        acceleration[i].normalize();
        acceleration[i].mult(0.5);
        velocity[i].add(acceleration[i]);
        velocity[i].limit(topspeed);
        points[i].add(velocity[i]);
    }
}

function view() {
    for (var i = 0; i < points.length; i++) {
        stroke(255);
        point(points[i].x, points[i].y);
    }
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    sketchname = createA("https://www.openprocessing.org/sketch/418497");
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

    document.getElementById('thisurl').innerHTML = "chaos";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ first chaos came to be, but next... earth... and dim tartarus in the depth of the... earth, and eros... ]");
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
    sketchname = createA("https://www.openprocessing.org/sketch/418497");
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

    document.getElementById('thisurl').innerHTML = "chaos";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ first chaos came to be, but next... earth... and dim tartarus in the depth of the... earth, and eros... ]");
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
