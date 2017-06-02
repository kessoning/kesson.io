/* .rhodonea */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var p1, p2;

var n, d, k;

var a, r;

var theta = 0;

var speed;

var font;

function preload() {
    font = loadFont("assets/SourceCodePro-ExtraLight.ttf");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(220);

    theta = 0;

    d = width / 5;
    a = width / 9.6;
    r = a * sin(k * theta);

    p1 = createVector(r * cos(theta), r * sin(theta));
    p2 = createVector(r * cos(theta), r * sin(theta));

    grid();
}

function setup() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      pixelDensity(1);
      var shfl = select('#shuffleimg');
      shfl.hide();
  }

    var info = document.getElementById("infolink");
    info.style.color = "#555555";

    var info = document.getElementById("saucelink");
    info.style.color = "#555555";

    var shuffle = document.getElementById("shuffleimg");
    shuffle.src = "assets/shuffle_grey.png";

    createCanvas(windowWidth, windowHeight);

    createTitle();

    background(220);

    textFont(font);

    d = width / 5;

    n = floor(Math.random() * 10);
    d = floor(Math.random() * 10);

    speed = 5;

    k = n / d;

    p1 = createVector(r * cos(theta), r * sin(theta));
    p2 = createVector(r * cos(theta), r * sin(theta));

    a = width / 9.6;
    r = a * sin(k * theta);

    grid();
}

function draw() {
    fadeTitle();

    for (var i = 0; i < speed; i++) {
        k = n / d;
        r = a * sin(k * theta);
        p1 = createVector(r * cos(theta), r * sin(theta));

        stroke('#AA5959');
        line(width * 0.5 + p1.x, height * 0.5 + p1.y, width * 0.5 + p2.x, height * 0.5 + p2.y);

        p2 = p1;

        theta += 0.025;
    }
}

function grid() {
    stroke(190);
    line(width * 0.15, height * 0.5, width * 0.85, height * 0.5);
    line(width * 0.5, height * 0.15, width * 0.5, height * 0.85);

    line((width * 0.5) + a, (height * 0.5) - 5, (width * 0.5) + a, (height * 0.5) + 5);
    line((width * 0.5) - a, (height * 0.5) - 5, (width * 0.5) - a, (height * 0.5) + 5);
    line((width * 0.5) - 5, (height * 0.5) + a, (width * 0.5) + 5, (height * 0.5) + a);
    line((width * 0.5) - 5, (height * 0.5) - a, (width * 0.5) + 5, (height * 0.5) - a);

    textAlign(CENTER, CENTER);
    fill(50);
    text("k = " + n + "/" + d, width * 0.5, height * 0.925);
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        sketchname = createA("https://www.openprocessing.org/sketch/382010");
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

        document.getElementById('thisurl').innerHTML = "rhodonea";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ a curve which has the shape of a petalled flower ]");
        sketchdescription.style('font-family', 'sourceCode-extralight');
        sketchdescription.style('font-size', '1.5em');
        sketchdescription.id('thisurl');
        sketchdescription.style('color', '#555555');
        sketchdescription.style('position', 'absolute');
        sketchdescription.style('margin-right', '-50%');
        sketchdescription.style('top', '87.5%');
        sketchdescription.style('left', '50%');
        sketchdescription.style('text-align', 'center');
        sketchdescription.style('transform', 'translate(-50%, -50%)');

        document.getElementById('sourced').style.fontSize = "2em";
        document.getElementById('kessond').style.fontSize = "2em";
    } else {
        sketchname = createA("https://www.openprocessing.org/sketch/382010");
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

        document.getElementById('thisurl').innerHTML = "rhodonea";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ a curve which has the shape of a petalled flower ]");
        sketchdescription.style('font-family', 'sourceCode-extralight');
        sketchdescription.style('font-size', '0.8em');
        sketchdescription.id('thisurl');
        sketchdescription.style('color', '#555555');
        sketchdescription.style('position', 'absolute');
        sketchdescription.style('margin-right', '-50%');
        sketchdescription.style('top', '87.5%');
        sketchdescription.style('left', '50%');
        sketchdescription.style('text-align', 'center');
        sketchdescription.style('transform', 'translate(-50%, -50%)');
    }
}

function fadeTitle() {
    console.log(millis());
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
