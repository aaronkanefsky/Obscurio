/**
 * @class WinScreen
 * 
 * @description Container for Obscurio's win screen
 */
class WinScreen {
  /**
   * 
   * @param {Game} game Reference to current game
   */
  constructor(game) {
    this.game = game;
    this.animationStart = 0;
    this.restartButton;
    this.firework = [];
  }

  /**
   * @description Behavior on state entry
   */
  enter() {
    this.restartButton = new Button(430, 570, 100, 40, 'Play Again!', 20, this.menuFont, this.buttonColor);
    this.animationStart = frameCount;
    this.firework = [new fireworkObj(0), new fireworkObj(1), new fireworkObj(2), new fireworkObj(0)];
  }

  /**
   * @description Behavior while in Win Screen state
   */
  updateWinScreen() {
    if(frameCount - this.animationStart >= 500) {
      this.restartButton.updateButton();
    }
  }

  /**
    * @description Draws the win screen to the screen
    */
  drawWinScreen() {
    fill(0, 0, 0, 60); // don't erase the entire screen
    rect(0, 0, 400, 400);
    for (var j = 0; j < firework.length; j++) {
      if (firework[j].step === 0) {
        firework[j].position.set(200, 450);
        firework[j].target.set(random(100, 300), random(50, 120));
        firework[j].direction.set(firework[j].target.x -
        firework[j].position.x, firework[j].target.y - firework[j].position.y);
        var s = random(1, 2) / 100;
        firework[j].direction.mult(s);
        firework[j].step++;
      }
      else if (firework[j].step === 1) {
        firework[j].draw();
      }
      else if (firework[j].step === 2) {
        for (var i = 0; i < firework[j].explosions.length; i++) {
          firework[j].explosions[i].draw();
        }
        if (firework[j].explosions[0].timer <= 0) {
          firework[j].step = 0;
        }
      }
    }
    // Add animation of players leaving the library, then transition to static end screen
    // Current time given for transition between animation and static screen is an estimate
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
    text('Congratulations! You have escaped the library!', 300, 300);
    pop();
  }

  /**
   * @description Behavior on state exit
   */
  exit() {
    this.restartButton = null;
    this.animationStart = 0;
    this.game = null;
    this.firework = [];
  }
}
