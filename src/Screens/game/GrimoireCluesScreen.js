/**
 * @class GrimoireCluesScreen
 * 
 * @description Game loop screen class to contain screen where Grimoire sets up clues
 */
class GrimoireCluesScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.clueDoor1;
    this.clueDoor2;
    this.grimoire = loadImage(ASSET_PATH + 'grimoire.png');
    this.butterflyMarker1;
    this.butterflyMarker2;
  }

  enter() {
    this.clueDoor1 = this.gameLoop.gameDoors.pop();
    this.clueDoor2 = this.gameLoop.gameDoors.pop();
    this.butterflyMarker1 = new bMarkObj(220, 160, PI/4);
    this.butterflyMarker2 = new bMarkObj(380, 160, -PI/4);
  }

  update() {
    // Drag the butterfly markers using the cursor
    if(mouseIsPressed) {
      if(dist(this.butterflyMarker1.x, this.butterflyMarker1.y, mouseX, mouseY) < 10) {
        this.butterflyMarker1.x = mouseX;
        this.butterflyMarker1.y = mouseY;
        this.butterflyMarker2.selected = false;
        this.butterflyMarker1.selected = true;
      }
      else if(dist(this.butterflyMarker2.x, this.butterflyMarker2.y, mouseX, mouseY) < 10) {
        this.butterflyMarker2.x = mouseX;
        this.butterflyMarker2.y = mouseY;
        this.butterflyMarker1.selected = false;
        this.butterflyMarker2.selected = true;
      }
    }
  }

  exit() {
    this.clueDoor1 = null;
    this.clueDoor2 = null;
    // Take screenshot of grimoire clues setup to display in following screens
    this.gameLoop.grimoireClues = get(200, 50, 200, 100);
    this.grimoire = null;
    this.butterflyMarker1 = null;
    this.butterflyMarker2 = null;
  }

  draw() {
    image(this.grimoire, 200, 50, 200, 100);
    image(this.clueDoor1, 225, 50, 50, 50);
    image(this.clueDoor2, 325, 50, 50, 50);
    textSize(30);
    textMode(CENTER);
    text("In the next screen the traitor will have the chance to pick up to 2 doors to include in this level.", 300, 350);
    text("Step (1) All players except the Grimoire should now close their eyes.", 300, 400);
    text("Step (2) Grimoire count down from 3 and ask the traitor to open their eyes.", 300, 450);
    text("Step (3) On the next screen the traitor will indicate the number of the card with their fingers and the Grimoire will select the door they choose with the mouse.", 300, 500);
    text("Step (4) When the traitor is finished selecting doors, they should close their eyes and the Grimoire should select next on the screen.", 300, 550);
  }
}
