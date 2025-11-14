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
    this.menuFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf')
    this.buttonColor = color(143, 86, 59);
  }

  /**
   * @description Behavior on state entry
   */
  enter() {
    this.restartButton = new Button(430, 570, 100, 40, 'Play Again!', 20, this.menuFont, this.buttonColor);
    this.animationStart = frameCount;
    this.firework = [new fireworkObj(0), new fireworkObj(1), new fireworkObj(2), new fireworkObj(0), new fireworkObj(1), new fireworkObj(2)];
  }

  /**
   * @description Behavior while in Win Screen state
   */
  updateWinScreen() {
    this.restartButton.updateButton();
  }

  /**
    * @description Draws the win screen to the screen
    */
  drawWinScreen() {
    background(0);
    fill(0, 0, 0, 60); // don't erase the entire screen
    rect(0, 0, 600, 600);
    for (var j = 0; j < this.firework.length; j++) {
      if (this.firework[j].step === 0) {
        this.firework[j].position.set(300, 650);
        this.firework[j].target.set(random(100, 500), random(50, 120));
        this.firework[j].direction.set(this.firework[j].target.x - this.firework[j].position.x, this.firework[j].target.y - this.firework[j].position.y);
        var s = random(1, 2) / 100;
        this.firework[j].direction.mult(s);
        this.firework[j].step++;
      }
      else if (this.firework[j].step === 1) {
        this.firework[j].draw();
      }
      else if (this.firework[j].step === 2) {
        for (var i = 0; i < this.firework[j].explosions.length; i++) {
          this.firework[j].explosions[i].draw();
        }
        if (this.firework[j].explosions[0].timer <= 0) {
          this.firework[j].step = 0;
        }
      }
    }
    // Add animation of players leaving the library, then transition to static end screen
    // Current time given for transition between animation and static screen is an estimate
    this.restartButton.drawButton();
      
    push();
    rectMode(CENTER);
    strokeWeight(3);
    stroke(0);
    fill(this.buttonColor);
    rect(300, 300, 500, 100,15);
    fill(0);
    textFont(this.menuFont);
    textAlign(CENTER,CENTER);
    noStroke();
    textSize(25);
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
