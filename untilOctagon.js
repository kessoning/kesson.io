/* until.Octagon */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var points = [];

function setup() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      pixelDensity(1);
  }

  var info = document.getElementById("infolink");
  info.style.color="#555555";

  var info = document.getElementById("saucelink");
  info.style.color="#555555";

  var shuffle = document.getElementById("shuffleimg");
  shuffle.src="assets/shuffle_grey.png";

  createCanvas(windowWidth, windowHeight);

  createTitle();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  fadeTitle();

  background(200);

  translate(width/2, height/2);
  rotate(-PI/2);

  if (frameCount%50 == 0) {
    var a = random(Math.PI*2);
    points.push(createVector(0, 0));
  }

  if (points.length > 8) {
    points = [];
  }

  for (var i = 0; i < points.length; i++) {
    var a = map(i, 0, points.length, 0, Math.PI*2);
    var np = createVector(cos(a) * 200, sin(a) * 200);
    var dp = p5.Vector.sub(np, points[i]);
    var vp = p5.Vector.div(dp, 3);
    points[i].add(vp);

    fill(50);
    noStroke();
    ellipseMode(CENTER);
    ellipse(points[i].x, points[i].y, 8, 8);

    stroke(50, 25);
    line(-width/2, points[i].y, width/2, points[i].y);
    line(points[i].x, -height/2, points[i].x, height/2);

    for (var j = 0; j < points.length; j++) {
      stroke(50, 100);
      line(points[i].x, points[i].y, points[j].x, points[j].y);
    }
  }
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
    sketchname = createA("https://www.openprocessing.org/sketch/381140");
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

    document.getElementById('thisurl').innerHTML = "until.Octagon";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ an octagon is an eight-sided polygon ]");
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

function fadeTitle() {
    if (millis() > 5000 && titleOpacity > 0) {
        titleOpacity -= 0.025;
    }
    sketchname.style('opacity', '' + titleOpacity);
    if (titleOpacity < 0.025) {
        sketchname.hide();
        sketchdescription.hide();
    }
}
