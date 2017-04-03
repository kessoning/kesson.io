/* .rorschachGenerator */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var points = [];

var pos;
var npos;

var pg;

var maxPoints;
var maxDist;
var maxSize;

var font;
var showFont = true;

var selector;

function setup() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        pixelDensity(1);
    }

    var info = document.getElementById("infolink");
    info.style.color = "#000000";

    var info = document.getElementById("saucelink");
    info.style.color = "#000000";

    var shuffle = document.getElementById("shuffleimg");
    shuffle.src = "assets/shuffle_black.png";

    createCanvas(windowWidth, windowHeight);

    createTitle();

    pg = createGraphics(width, height);

    reset();

    if (Math.random() < 0.5) {
        selector = 0;
    } else {
        selector = 1;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pg = createGraphics(windowWidth, windowHeight);
    reset();
    showFont = true;
}

function draw() {
    fadeTitle();

    background(255);

    if (selector === 0) {
        randomGenerator();
    } else {
        noiseGenerator();
    }

    image(pg, 0, 0, width, height);

    push();
    scale(-1, 1);
    translate(-width, 0);
    image(pg, 0, 0, width, height);
    pop();

    push();
    scale(-1, -1);
    translate(-width, -height);
    image(pg, 0, 0, width, height);
    pop();

    push();
    scale(1, -1);
    translate(0, -height);
    image(pg, 0, 0, width, height);
    pop();
}

function reset() {
    background(255);

    pg.clear();

    points = [];

    pos = createVector(width / 2, height / 2);
    npos = createVector(random(10), random(10));

    maxPoints = floor(random(128, 1024));
    maxDist = floor(random(50, 250));
    maxSize = floor(random(width / 40, width / 80));
}

function randomGenerator() {
    if (points.length < maxPoints) {
        for (var i = 0; i < points.length; i++) {
            if (dist(pos.x, pos.y, points[i].x, points[i].y) < maxDist) {
                pg.stroke(0, 25);
                pg.line(pos.x, pos.y, points[i].x, points[i].y);
            }
        }

        points.push(createVector(pos.x, pos.y));

        pos.x += random(-maxSize, maxSize);
        pos.y += random(-maxSize, maxSize);

        if (pos.x < width * 0.1 || pos.x > width * 0.9) {
            pos.x = width / 2;
        }

        if (pos.y < height * 0.1 || pos.y > height * 0.9) {
            pos.y = height / 2;
        }
    }
}

function noiseGenerator() {
    if (points.length < maxPoints) {

        for (var i = 0; i < points.length; i++) {
            if (dist(pos.x, pos.y, points[i].x, points[i].y) < maxDist) {
                pg.stroke(0, 25);
                pg.line(pos.x, pos.y, points[i].x, points[i].y);
            }
        }

        append(points, createVector(pos.x, pos.y));

        pos.x += map(noise(npos.x), 0, 1, -maxSize, maxSize);
        pos.y += map(noise(npos.y), 0, 1, -maxSize, maxSize);

        if (pos.x < width * 0.1 || pos.x > width * 0.9) {
            pos.x = width / 2;
        }

        if (pos.y < height * 0.1 || pos.y > height * 0.9) {
            pos.y = height / 2;
        }

        npos.x += 0.1;
        npos.y += 0.1;
    }
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
    sketchname = createA("http://www.kesson.io/rorschach.html");
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

    document.getElementById('thisurl').innerHTML = "Rorschach.generator";
    document.getElementById('thisurl').setAttribute('target', '_blank');

    sketchdescription = createP("[ the Rorschach Test is a projective psychological test developed in 1921 to measure thought disorder ]");
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
