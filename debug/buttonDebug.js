/**
 * Obscurio
 * 
 * By: Emma Wallace and Aaron Kanefsky 
 */
let myFont;
let buttonText = "Hello there!"
let buttonColor;
let myButton;
function preload(){
  myFont = loadFont('/assets/fonts/Firlest-Regular.otf');
}

function setup() {
  createCanvas(650, 570);
  frameRate(60);
  buttonColor = color(0, 100, 100, 255)
  myButton = new Button(100, 100, 80, 30, buttonText, 14, 'Arial', buttonColor);
  
}

function draw() {
  background(255, 0, 0);
  if(myButton.pressed === true){
    background(0, 255, 0);
  }
  textFont(myFont);
  textSize(40);
  text("The quick brown fox jumped", 10, 200)
  text("over the lazy dog!", 30, 235);
  myButton.updateButton();
  myButton.drawButton();
}


