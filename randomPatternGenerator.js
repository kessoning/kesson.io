/* .random.patternGenerator */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var cellsize;

var pg;

var x;
var y;
var speed;

var isMobile;

function setup() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    } else {
        isMobile = false;
    }

    var info = document.getElementById("infolink");
    info.style.color = "#555555";

    var info = document.getElementById("saucelink");
    info.style.color = "#555555";

    var shuffle = document.getElementById("shuffleimg");
    shuffle.src = "assets/shuffle_grey.png";

    if (isMobile) {
        pixelDensity(1);
        speed = 40;
    } else {
        speed = 20;
    }

    //makeDiv();

    createCanvas(windowWidth, windowHeight);

    // create the title
    createTitle();

    pixelDensity(1);

    pg = createGraphics(width, height);

    x = 0;
    y = 0;

    background(255);
    pg.background(255);
    cellsize = width / 50;
}

function draw() {
    // fade the title
    fadeTitle();

    for (var i = 0; i < speed; i++) {
        if (random(1) > 0.5) {
            pg.stroke(100, 75, 75);
            pg.strokeWeight(random(5));
            pg.line(x, y, x + cellsize, y + cellsize);
        } else {
            pg.stroke(75, 100, 100);
            pg.strokeWeight(random(5));
            pg.line(x + cellsize, y, x, y + cellsize);
        }

        x += cellsize;

        if (x > width) {
            x = 0;
            y += cellsize;
        }
    }

    blendMode(NORMAL);
    background(255);
    push();
    imageMode(CENTER);
    image(pg, width / 2, height / 2, width, height);
    pop();

    push();
    scale(-1, 1);
    imageMode(CENTER);
    translate(-width, 0);
    blendMode(LIGHTEST);
    image(pg, width / 2, height / 2, width, height);
    pop();
}

function reset() {
    background(255);
    pg.background(255);
    x = 0;
    y = 0;
    speed = 2 + Math.random() * 8;
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        sketchname = createA("https://www.openprocessing.org/sketch/417181");
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

        document.getElementById('thisurl').innerHTML = "Random.pattern";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ simple pattern generator ]");
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
        sketchname = createA("https://www.openprocessing.org/sketch/417181");
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

        document.getElementById('thisurl').innerHTML = "Random.pattern";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ simple pattern generator ]");
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
