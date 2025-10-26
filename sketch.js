/**
 * Obscurio
 * 
 * By: Emma Wallace and Aaron Kanefsky 
 */
let myFont;
function preload(){
  myFont = loadFont('/assets/fonts/Firlest-Regular.otf');
}

function setup() {
  createCanvas(500, 500);
  frameRate(60);
}

function draw() {
  background(255, 0, 0);

  textFont(myFont);
  textSize(40)
  text("The quick brown fox jumped", 10, 200)
  text("over the lazy dog!", 30, 235)
}


