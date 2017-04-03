/* .random.TestPattern */

/*
 ** Copyright by Kesson Dalef (Giovanni Muzio)
 ** Creative Commons: Attribution Non-Commercial license
 **
 ** mail: kessoning@gmail.com
 ** web: www.kesson.io
 */

// release date: April 2016

var input;
var analyzer;
var fft;

var pg;
var pj;

function setup() {
    createCanvas(windowWidth, windowHeight);

    createTitle();

    pg = createGraphics(width, height);
    pj = createGraphics(width, height / 4);

    mic = new p5.AudioIn(0.99);

    mic.start();

    fft = new p5.FFT();
    fft.setInput(mic);
}

function draw() {
  fadeTitle();

    background(0);
    noStroke();

    pj.background(0);

    var spectrum = fft.analyze();
    print(frameRate);

    for (var i = 0; i < spectrum.length / 2; i++) {
        pj.fill(spectrum[i]);
        pj.noStroke();
        pj.rect(map(i, 0, spectrum.length / 2, 0, width * 1.5), 0, width / (spectrum.length / 2), pj.height);
    }

    pg.background(0);

    pg.push();
    pg.image(pj, 0, 0, pg.width, height / 4);
    pg.pop();

    pg.push();
    pg.scale(-1, 1);
    pg.image(pj, -pg.width, pg.height / 4);
    pg.pop();

    pg.push();
    pg.image(pj, 0, (pg.height / 4) * 2);
    pg.pop();

    pg.push();
    pg.scale(-1, 1);
    pg.image(pj, -pg.width, (pg.height / 4) * 3);
    pg.pop();

    push();
    image(pg, 0, 0, width, height);
    pop();
}

// sketch title

var sketchname;
var sketchdescription;
var titleOpacity = 1;

function createTitle() {
  sketchname = createA("http://www.kesson.io/testpattern.html");
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

  document.getElementById('thisurl').innerHTML = "Test.pattern";
  document.getElementById('thisurl').setAttribute('target', '_blank');

  sketchdescription = createP("[       audio visualizer       ]");
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

function fadeTitle() {
  if (millis() > 5000 && titleOpacity > 0) { titleOpacity -= 0.025;}
  sketchname.style('opacity', '' + titleOpacity);
  sketchdescription.style('opacity', '' + titleOpacity);
  if (titleOpacity < 0.025) {
    sketchname.hide();
    sketchdescription.hide();
  }
}
