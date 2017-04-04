/* .hypotrochoid */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var p, pp;
var start;

var a, b, h, theta, speed;

var na, nb, nh;

var going;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  na = Math.random() * 10;
  nb = Math.random() * 10;
  nh = Math.random() * 10;

  reset();
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

  na = Math.random() * 10;
  nb = Math.random() * 10;
  nh = Math.random() * 10;

  reset();
}

function draw() {
  // fade the title
  fadeTitle();

  if (going) {
    for (var i = 0; i < speed; i++) {
      push();
      translate(width / 2, height / 2);

      p.x = (a - b) * cos(theta) + h * cos(((a - b) / b) * theta);
      p.y = (a - b) * sin(theta) - h * sin(((a - b) / b) * theta);

      stroke(255, 10);
      line(cos(theta) * a, sin(theta) * a, p.x, p.y);
      stroke(180, 112, 112, 100);
      if (pp.x != 0 && pp.y != 0) line(p.x, p.y, pp.x, pp.y);
      pop();

      pp.x = p.x;
      pp.y = p.y;

      theta += 0.03;
    }

    if (dist(p.x, p.y, start.x, start.y) < 1 && theta > PI) {
      going = false;
    }
  }
}

function reset() {
  var max;
  if (width > height) {
    max = height * 0.25;
  } else {
    max = width * 0.25;
  }

  a = map(na, 0, 10, 0, max);
  b = map(nb, 0, 10, 0, max);
  h = map(nh, 0, 10, 0, max * 0.8);

  theta = 0;

  speed = 30;

  var x = (a - b) * cos(theta) + h * cos(((a - b) / b) * theta);
  var y = (a - b) * sin(theta) + h * sin(((a - b) / b) * theta);

  p = createVector(x, y);
  pp = createVector(0, 0);
  start = createVector(x, y);

  going = true;

  background(50);
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    sketchname = createA("https://www.openprocessing.org/sketch/416915");
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

    document.getElementById('thisurl').innerHTML = "hypotrochoid";
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
    sketchname = createA("https://www.openprocessing.org/sketch/416915");
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

    document.getElementById('thisurl').innerHTML = "hypotrochoid";
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
  if (titleOpacity < 0.025) sketchname.hide();
}
