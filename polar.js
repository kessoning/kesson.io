/* .Polar.coordinates */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var p;

var a, r, font;

function preload() {
    font = loadFont("assets/SourceCodePro-ExtraLight.ttf");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    r = width / 25.6;
    a = 0;

}

function setup() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        pixelDensity(1);
    }

    var info = document.getElementById("infolink");
    info.style.color = "#555555";

    var info = document.getElementById("saucelink");
    info.style.color = "#555555";

    var shuffle = document.getElementById("shuffleimg");
    shuffle.src = "assets/shuffle_grey.png";

    createCanvas(windowWidth, windowHeight);

    // create the title
    createTitle();

    r = width / 25.6;
    a = 0;

    p = createVector(cos(a) * r, sin(a) * r);

    textFont(font);
}

function draw() {
    // fade the title
    fadeTitle();

    background(220);

    grid();

    p.x = width * 0.25 + cos(a) * r;
    p.y = height / 2 + sin(a) * r;

    ellipseMode(CENTER);
    stroke(150);
    noFill();
    ellipse(width * 0.25, height / 2, r * 2, r * 2);

    fill(100);
    noStroke();
    ellipse(p.x, p.y, 5, 5);

    stroke(100);
    line(width * 0.25, height / 2, p.x, p.y);

    sinewaves();

    legend();

    a += 0.05;
}

function grid() {
    stroke(180);
    line(width * 0.25 - r - (r / 2), height / 2, width * 0.85, height / 2);
    line(width * 0.25, height / 2 - r - (r / 2), width * 0.25, height / 2 + r + (r / 2));
    line(width * 0.25, height / 2 - r, width * 0.85, height / 2 - r);
    line(width * 0.25, height / 2 + r, width * 0.85, height / 2 + r);
    line(width * 0.5, height / 2 - r, width * 0.5, height / 2 + r);

    textAlign(LEFT, BOTTOM);
    text("1", width * 0.5, height * 0.5 - r);
    textAlign(LEFT, TOP);
    text("0", width * 0.5 + 3, height * 0.5 + 3);
    textAlign(CENTER, TOP);
    text("-1", width * 0.5, height * 0.5 + r + 3);
}

function sinewaves() {
    var b = a;
    for (var x = int(width * 0.5); x < width * 0.75 + r; x++) {
        stroke('#AA5959');
        point(x, height / 2 + sin(b) * r);
        stroke('#5975AA');
        point(x, height * 0.5 + cos(b) * r);
        b += TWO_PI / 280;
    }
}

function legend() {
    stroke('#AA5959');
    line(p.x, p.y, width * 0.5, height / 2 + sin(a) * r);
    stroke('#5975AA');
    line(p.x, height * 0.5 + cos(a) * r, width * 0.5, height * 0.5 + cos(a) * r);
    line(p.x, p.y, p.x, height * 0.5 + cos(a) * r);

    fill('#AA5959');
    noStroke();
    rectMode(CENTER);
    rect(width * 0.6, height * 0.5 + (r * 1.5), 10, 10);
    fill(100);
    textAlign(CENTER, LEFT);
    text("sin(a)", width * 0.6 + 35, height * 0.5 + (r * 1.5) + 4);

    fill('#5975AA');
    noStroke();
    rectMode(CENTER);
    rect(width * 0.75, height * 0.5 + (r * 1.5), 10, 10);
    fill(100);
    textAlign(CENTER, LEFT);
    text("cos(a)", width * 0.75 + 35, height * 0.5 + (r * 1.5) + 4);

    textAlign(CENTER, CENTER);
    text("P(x) = cos(a)*r | P(y) = sin(a)*r", width / 2, height * 0.75);
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        sketchname = createA("https://www.openprocessing.org/sketch/382161");
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

        document.getElementById('thisurl').innerHTML = "Polar.coordinates";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ how polar coordinates works ]");
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
        sketchname = createA("https://www.openprocessing.org/sketch/382161");
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

        document.getElementById('thisurl').innerHTML = "Polar.coordinates";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ how polar coordinates works ]");
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
