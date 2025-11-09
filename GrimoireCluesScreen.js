class GrimoireCluesScreen {
  constructor() {
    
  }

  enter() {
    
  }

  update() {

  }

  exit() {

  }

  draw() {
    
    textSize(30);
    textMode(CENTER);
    text("In the next screen the traitor will have the chance to pick up to 2 doors to include in this level.", 300, 350);
    text("Step (1) All players except the Grimoire should now close their eyes.", 300, 400);
    text("Step (2) Grimoire count down from 3 and ask the traitor to open their eyes.", 300, 450);
    text("Step (3) On the next screen the traitor will indicate the number of the card with their fingers and the Grimoire will select the door they choose with the mouse.", 300, 500);
    text("Step (4) When the traitor is finished selecting doors, they should close their eyes and the Grimoire should select next on the screen.", 300, 550);
  }
}
