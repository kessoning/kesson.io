/* gravitational drawer */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: May 2016

var points1 = [];
var acceleration1 = [];
var velocity1 = [];

var points2 = [];
var points3 = [];
var points4 = [];

var topspeed;
var attract;
var pointsdimension;
var numpoints;
var center_gravity;

var hmirror = false;
var vmirror = false;
var whitebg = false;

var guiControls;
var datGUI;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    reset();
}

function setup() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var shfl = select('#shuffleimg');
        shfl.hide();
    }

    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);

    // create the title
    createTitle();

    // init the gui
    initGUI();

    colorMode(HSB, 360);

    reset();
}

function draw() {
    fadeTitle();

    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!mobile) {
        center_gravity.x = mouseX;
        center_gravity.y = mouseY;
    }

    move();
    view();
}

function move() {
    for (var i = 0; i < numpoints; i++) {
        acceleration1[i] = p5.Vector.sub(center_gravity, points1[i]);
        acceleration1[i].normalize();
        acceleration1[i].mult(0.5);
        velocity1[i].add(acceleration1[i]);
        velocity1[i].limit(attract);
        points1[i].add(velocity1[i]);
        points2[i].set(width - points1[i].x, points1[i].y);
        points3[i].set(points1[i].x, height - points1[i].y);
        points4[i].set(width - points1[i].x, height - points1[i].y);
    }
}

function view() {
    for (var i = 0; i < points1.length; i++) {
        var c;
        if (!whitebg) {
            c = color(noise(frameCount / 100) * 360, 200, 360, 10);
            blendMode(ADD);
        } else {
            c = color(noise(frameCount / 100) * 360, 200, 180, 10);
            blendMode(MULTIPLY);
        }
        stroke(c);
        point(points1[i].x, points1[i].y);
        for (var j = 0; j < points1.length; j++) {
            if (dist(points1[i].x, points1[i].y, points1[j].x, points1[j].y) < width / 12) {
                line(points1[i].x, points1[i].y, points1[j].x, points1[j].y);
            }

            if (dist(points2[i].x, points2[i].y, points2[j].x, points2[j].y) < width / 12 && hmirror) {
                line(points2[i].x, points2[i].y, points2[j].x, points2[j].y);
            }

            if (dist(points3[i].x, points3[i].y, points3[j].x, points3[j].y) < width / 12 && vmirror) {
                line(points3[i].x, points3[i].y, points3[j].x, points3[j].y);
            }

            if (dist(points4[i].x, points4[i].y, points4[j].x, points4[j].y) < width / 12 && hmirror && vmirror) {
                line(points4[i].x, points4[i].y, points4[j].x, points4[j].y);
            }
        }
    }
}

function reset() {
    topspeed = 10 + Math.random() * 20;
    attract = topspeed;
    numpoints = 32;
    pointsdimension = 0.5 + Math.random();
    center_gravity = createVector(random(width * 0.3, width * 0.7), random(height * 0.3, height * 0.7));

    for (var i = 0; i < numpoints; i++) {
        points1[i] = createVector(Math.random() * width, Math.random() * height);
        acceleration1[i] = createVector(0, 0);
        velocity1[i] = createVector(0, 0);
        points2[i] = createVector(width - points1[i].x, points1[i].y);
        points3[i] = createVector(points1[i].x, height - points1[i].y);
        points4[i] = createVector(width - points1[i].x, height - points1[i].y);
    }

    blendMode(NORMAL);
    if (whitebg) {
        background(360);
    } else {
        background(0);
    }
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        sketchname = createA("https://www.openprocessing.org/sketch/426064");
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

        document.getElementById('thisurl').innerHTML = "g.draw";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ particles are attracted by your mouse location ]\n_best_experience_on_desktop_version_");
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
        sketchname = createA("https://www.openprocessing.org/sketch/426064");
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

        document.getElementById('thisurl').innerHTML = "g.draw";
        document.getElementById('thisurl').setAttribute('target', '_blank');

        sketchdescription = createP("[ particles are attracted by your mouse location ]");
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
    if (titleOpacity < 0.025) {
        sketchname.hide();
        sketchdescription.hide();
    }
}

function initGUI() {
    guiControls = new function() {
        this.horizontalMirror = false;
        this.verticalMirror = false;
        this.lightTheme = false;

        this.resetFrame = function() {
            reset()
        };
        this.saveFrame = function() {
            save("g.draw.png")
        };
    }

    datGUI = new dat.GUI();

    datGUI.add(guiControls, 'resetFrame');
    datGUI.add(guiControls, 'saveFrame');

    datGUI.add(guiControls, 'horizontalMirror').onChange(function(value) {
        hmirror = value;
    });

    datGUI.add(guiControls, 'verticalMirror').onChange(function(value) {
        vmirror = value;
    });

    datGUI.add(guiControls, 'lightTheme').onChange(function(value) {
        whitebg = value;
        reset();
    });

    datGUI.open();
}
