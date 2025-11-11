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
  }

  /**
   * @description Behavior on state entry
   */
  enter() {
    this.restartButton = new Button(430, 570, 100, 40, 'Play Again!', 20, this.menuFont, this.buttonColor);
    this.animationStart = frameCount;
  }

  /**
   * @description Behavior while in Lose Screen state
   */
  updateLoseScreen() {
    if(frameCount - this.animationStart >= 500) {
      this.restartButton.updateButton();
    }
  }

  /**
    * @description Draws the win screen to the screen
    */
  drawLoseScreen() {
    // Add animation of players leaving the library, then transition to static end screen
    // Current time given for transition between animation and static screen is an estimate
    if(frameCount - this.animationStart < 500) {

    }
    else {
      image(this.game.backgroundImage, 0, 0, 600, 600);
      this.restartButton.draw();
      
      push();
      rectMode(CENTER);
      strokeWeight(3);
      fill(this.buttonColor);
      rect(300, 300, 200, 200);
      fill(0);
      textFont(this.game.menuFont);
      textAlign(CENTER,CENTER);
      textSize(60);
      text('Oh no! You are now stuck in the library forever and the traitor has won!', 300, 300);
      pop();
    }
  }

  /**
   * @description Behavior on state exit
   */
  exit() {
    this.restartButton = null;
    this.animationStart = 0;
    this.game = null;
  }
}
