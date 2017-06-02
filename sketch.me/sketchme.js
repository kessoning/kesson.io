var points = [];
var hmpoints = [];
var vmpoints = [];
var hvmpoints = [];

var noiseVector;
var nvnoise;
var makeNoise = false;

var hmirror = false;
var vmirror = false;

var guiControls;
var datGUI;

var horizontalMirror = false;
var verticalMirror = false;
var makeNoise = false;

var backgroundColor = "#000000";
var linesColor = "#ffffff";

var symmetry = 4;
var strokeThickness = 1;
var strokeAlpha = 10;
var pointsSize = 0;
var maxDistance = 200;

var pg;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  pg = createGraphics(width, height);

  colorMode(HSB);

  noiseVector = createVector(width / 2, height / 2);
  nvn = createVector(random(10), random(10));

  background(backgroundColor);

  initGUI();
}

function initGUI() {
  guiControls = new function() {
    this.horizontalMirror = false;
    this.verticalMirror = false;
    this.makeNoise = false;

    this.resetFrame = function() {
      reset()
    };
    this.saveFrame = function() {
      save("sketchME.png")
    };
    this.addRandomPoints = function() {
      addRandomPoints()
    };

    this.strokeAlpha = 10;
    this.symmetry = 4;
    this.maxDistance = 200;
    this.strokeThickness = 1;
    this.pointsSize = 0;
    this.backgroundColor = "#000000";
    this.linesColor = "#ffffff";
  }

  datGUI = new dat.GUI();

  datGUI.add(guiControls, 'resetFrame');
  datGUI.add(guiControls, 'saveFrame');
  datGUI.add(guiControls, 'addRandomPoints');

  datGUI.add(guiControls, 'horizontalMirror').onChange(function(value) {
    horizontalMirror = value;
  });

  datGUI.add(guiControls, 'verticalMirror').onChange(function(value) {
    verticalMirror = value;
  });

  datGUI.add(guiControls, 'makeNoise').onChange(function(value) {
    makeNoise = value;
  });

  datGUI.add(guiControls, 'symmetry', 0, 24).onChange(function(value) {
    symmetry = floor(value);
  });

  datGUI.add(guiControls, 'maxDistance', 0, width).onChange(function(value) {
    maxDistance = value;
  });

  datGUI.add(guiControls, 'strokeThickness', 0, 20).onChange(function(value) {
    strokeThickness = value;
  });

  datGUI.add(guiControls, 'strokeAlpha', 0, 255).onChange(function(value) {
    strokeAlpha = value;
  });

  datGUI.add(guiControls, 'pointsSize', 0, 20).onChange(function(value) {
    pointsSize = value;
  });

  datGUI.addColor(guiControls, 'backgroundColor').onChange(function(value) {
    backgroundColor = value;
  });

  datGUI.addColor(guiControls, 'linesColor').onChange(function(value) {
    linesColor = value;
  });

  datGUI.open();
}

function draw() {
  background(backgroundColor);

  if (makeNoise) {
    sketchNoise();
  }

  for (var i = 0; i < symmetry; i++) {
    push();
    //blendMode(LIGHTEST);
    imageMode(CENTER);
    translate(width/2, height/2);
    rotate(i*TWO_PI/symmetry);
    image(pg, 0, 0, width, height);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
  if (mouseX < width - datGUI.width) {
    datGUI.close();
  }

  if (datGUI.closed) {
    var c = color(linesColor);
    var p1 = createVector(mouseX, mouseY);

    for (var i = 0; i < points.length; i++) {
      if (dist(p1.x, p1.y, points[i].x, points[i].y) < maxDistance) {
        pg.stroke(red(c), green(c), blue(c), strokeAlpha);
        pg.strokeWeight(strokeThickness);
        pg.line(p1.x, p1.y, points[i].x, points[i].y);
      }
    }

    append(points, createVector(mouseX, mouseY));

    if (horizontalMirror) {
      var p2 = createVector(width - mouseX, mouseY);

      for (var j = 0; j < hmpoints.length; j++) {
        if (dist(p2.x, p2.y, hmpoints[j].x, hmpoints[j].y) < maxDistance) {
          pg.stroke(red(c), green(c), blue(c), strokeAlpha);
          pg.strokeWeight(strokeThickness);
          pg.line(p2.x, p2.y, hmpoints[j].x, hmpoints[j].y);
        }
      }

      append(hmpoints, createVector(width - mouseX, mouseY));
    }

    if (verticalMirror) {
      var p3 = createVector(mouseX, height - mouseY);

      for (var k = 0; k < vmpoints.length; k++) {
        if (dist(p3.x, p3.y, vmpoints[k].x, vmpoints[k].y) < maxDistance) {
          pg.stroke(red(c), green(c), blue(c), strokeAlpha);
          pg.strokeWeight(strokeThickness);
          pg.line(p3.x, p3.y, vmpoints[k].x, vmpoints[k].y);
        }
      }

      append(vmpoints, createVector(mouseX, height - mouseY));
    }

    if (verticalMirror && horizontalMirror) {
      var p4 = createVector(width - mouseX, height - mouseY);

      for (var l = 0; l < hvmpoints.length; l++) {
        if (dist(p4.x, p4.y, hvmpoints[l].x, hvmpoints[l].y) < maxDistance) {
          pg.stroke(red(c), green(c), blue(c), strokeAlpha);
          pg.strokeWeight(strokeThickness);
          pg.line(p4.x, p4.y, hvmpoints[l].x, hvmpoints[l].y);
        }
      }

      append(hvmpoints, createVector(width - mouseX, height - mouseY));
    }
  }
}

function reset() {
  points = [];
  hmpoints = [];
  vmpoints = [];
  hvmpoints = [];

  background(backgroundColor);
  pg.clear();

  noiseVector = createVector(width / 2, height / 2);
  nvn = createVector(random(10), random(10));
}

function sketchNoise() {
  noiseVector.x += map(noise(nvn.x), 0, 1, -width / 40, width / 40);
  noiseVector.y += map(noise(nvn.y), 0, 1, -width / 40, width / 40);

  if (noiseVector.x < width * 0.1 || noiseVector.x > width * 0.9) {
    noiseVector.x = width / 2;
  }

  if (noiseVector.y < height * 0.1 || noiseVector.y > height * 0.9) {
    noiseVector.y = height / 2;
  }

  nvn.x += 0.1;
  nvn.y += 0.1;

  var c = color(linesColor);

  var p = createVector(noiseVector.x, noiseVector.y);

  pg.fill(red(c), green(c), blue(c), 100);
  pg.noStroke();
  pg.ellipse(p.x, p.y, pointsSize, pointsSize);

  for (var i = 0; i < points.length; i++) {
    if (dist(p.x, p.y, points[i].x, points[i].y) < maxDistance) {
      pg.stroke(red(c), green(c), blue(c), strokeAlpha);
      pg.strokeWeight(strokeThickness);
      pg.line(p.x, p.y, points[i].x, points[i].y);
    }
  }

  append(points, createVector(noiseVector.x, noiseVector.y));

  if (horizontalMirror) {
    var hp = createVector(width - noiseVector.x, noiseVector.y);

    for (var j = 0; j < hmpoints.length; j++) {
      if (dist(hp.x, hp.y, hmpoints[j].x, hmpoints[j].y) < maxDistance) {
        pg.stroke(red(c), green(c), blue(c), strokeAlpha);
        pg.strokeWeight(strokeThickness);
        pg.line(hp.x, hp.y, hmpoints[j].x, hmpoints[j].y);
      }
    }

    append(hmpoints, createVector(width - noiseVector.x, noiseVector.y));
  }

  if (verticalMirror) {
    var vp = createVector(noiseVector.x, height - noiseVector.y);

    for (var k = 0; k < vmpoints.length; k++) {
      if (dist(vp.x, vp.y, vmpoints[k].x, vmpoints[k].y) < maxDistance) {
        pg.stroke(red(c), green(c), blue(c), strokeAlpha);
        pg.strokeWeight(strokeThickness);
        pg.line(vp.x, vp.y, vmpoints[k].x, vmpoints[k].y);
      }
    }

    append(vmpoints, createVector(noiseVector.x, height - noiseVector.y));
  }

  if (verticalMirror && horizontalMirror) {
    var hvp = createVector(width - noiseVector.x, height - noiseVector.y);

    for (var l = 0; l < hvmpoints.length; l++) {
      if (dist(hvp.x, hvp.y, hvmpoints[l].x, hvmpoints[l].y) < maxDistance) {
        pg.stroke(red(c), green(c), blue(c), strokeAlpha);
        pg.strokeWeight(strokeThickness);
        pg.line(hvp.x, hvp.y, hvmpoints[l].x, hvmpoints[l].y);
      }
    }

    append(hvmpoints, createVector(width - noiseVector.x, height - noiseVector.y));
  }
}

function addRandomPoints() {
  var a = random(128, 1024);

  for (var i = 0; i < a; i++) {
    var x = random(width * 0.1, width * 0.9);
    var y = random(height * 0.1, height * 0.9);
    append(points, createVector(x, y));
    append(hmpoints, createVector(width - x, y));
    append(vmpoints, createVector(x, height - y));
    append(hvmpoints, createVector(width - x, height - y));
  }
}
