/**
 * @class LoseScreen
 * 
 * @description Container for Obscurio's lose screen
 */
class LoseScreen {
  /**
   * 
   * @param {Game} game Reference to current game
   */
  constructor(game) {
    this.game = game;
    this.animationStart = 0;
    this.restartButton;
    this.menuFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf')
    this.buttonColor = color(143, 86, 59);
    this.torches = [new Torch(250,370), new Torch(300,370), new Torch(350,370)];
  }

  /**
   * @description Behavior on state entry
   */
  enter() {
    this.restartButton = new Button(430, 570, 120, 40, 'Play Again!', 20, this.menuFont, this.buttonColor);
    this.animationStart = frameCount;
  }

  /**
   * @description Behavior while in Lose Screen state
   */
  updateLoseScreen() {
    this.restartButton.updateButton();
  }

  /**
    * @description Draws the win screen to the screen
    */
  drawLoseScreen() {
    // Add animation of players leaving the library, then transition to static end screen
    // Current time given for transition between animation and static screen is an estimate
    background(110);
    strokeWeight(2);
  
    fill(18, 112, 43);
    quad(200,350,400,350,420,330,220,330);
    
    
    this.restartButton.drawButton();
    for(let t of this.torches) {
      t.update();
    }

    push();
    stroke(0);
    rectMode(CENTER);
    strokeWeight(3);
    fill(this.buttonColor);
    rect(300, 100, 520, 100, 15);
    fill(0);
    noStroke();
    textFont(this.menuFont);
    textAlign(CENTER,CENTER);
    textSize(30);
    text('Oh no! You are now stuck in the library', 300, 75);
    text('forever and the traitor has won!', 300, 125);
    pop();

    strokeWeight(2);
    stroke(0);
    fill(21, 133, 51);
    rect(200,350,200,100);
    quad(400,350,420,330,420,440,400,450);
    fill(18, 112, 43);
    strokeWeight(1);
    rect(220,370,10,60,15);
    rect(270,370,10,60,15);
    rect(320,370,10,60,15);
    rect(370,370,10,60,15);
  }

  /**
   * @description Behavior on state exit
   */
  exit() {
    this.restartButton = null;
    this.animationStart = 0;
    this.torches = null;
    this.game = null;
  }
}
