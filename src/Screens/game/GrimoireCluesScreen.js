/**
 * @class GrimoireCluesScreen
 * 
 * @description Game loop screen class to contain screen where Grimoire sets up clues
 */

const GrimoireState = {
  INSTRUCTIONS: 0,
  SHOW_CLUES: 1,
  HIDE_CLUES: 2,
  PLACE_MARKERS: 3,
  READY: 4

}

let cluePicture;

class GrimoireCluesScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;

    // Images
    this.clueDoor1;
    this.clueDoor2;
    this.goalDoor;
    this.goalCover;
    this.grimoire = loadImage(ASSET_PATH + 'images/grimoire.png');
    this.grimoireBackground;
    this.butterflyMarker1;
    this.butterflyMarker2;
    this.randomDoorList = [5, 6, 7, 8, 9, 10, 11, 12, 13];



    this.continueButton;  // Continue Button for instructions
    this.nextButton = null;      // Next button to go to the next step
    this.backButton;      // Back button to go to the previous step
    this.buttonColor = color(97, 64, 38);
    this.buttonFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf')



    // State control
    this.state = GrimoireState.INSTRUCTIONS;
    this.done = false; // Set to true when the clue has been determined and covered. Helps move to the next phase
  }

  enter() {
    // Doors
    this.clueDoor1 = this.gameLoop.clueDoors[0];
    this.clueDoor2 = this.gameLoop.clueDoors[1];
    this.goalDoor = this.gameLoop.exitDoor;
    this.goalCover = new DoorObj(200, 500, 2, 5, 200, 360, 14, null, 2);

    // Butterfly markers
    this.butterflyMarker1 = new ButteryflyMarker(mouseX, mouseY, PI / 4);
    this.butterflyMarker2 = new ButteryflyMarker(mouseX, mouseY, PI / 4);

    // Screen Background
    this.grimoireBackground = loadImage(ASSET_PATH + 'images/GrimoireScreenBackground.png'); // Sourced from: https://www.etsy.com/listing/1496891045/vintage-grimoire-paper-blank-spell-pages

    // Buttons
    this.continueButton = new Button(300, 300, 200, 50, "Continue", 25, this.buttonFont, this.buttonColor)
    this.nextButton = new Button(530, 560, 100, 50, "Next", 25, this.buttonFont, this.buttonColor)
    this.backButton = new Button(70, 560, 100, 50, "Back", 25, this.buttonFont, this.buttonColor)
  }

  exit() {

    this.clueDoor1 = null;
    this.clueDoor2 = null;

    // Take screenshot of grimoire clues setup to display in following screens
    this.gameLoop.grimoireClues = get(200, 50, 200, 100);
    this.grimoire = null;
    this.butterflyMarker1 = null;
    this.butterflyMarker2 = null;
    this.continueButton = null;
    this.grimoireBackground = null;
  }

  update() {
    if (this.state === GrimoireState.INSTRUCTIONS)
      this.handleInstructions();
    else if (this.state === GrimoireState.SHOW_CLUES)
      this.handleClues();
    else if (this.state === GrimoireState.PLACE_MARKERS)
      this.handleMarkers();
    else if (this.state === GrimoireState.HIDE_CLUES)
      this.coverWinningDoor();
    else if (this.state === GrimoireState.READY)
      this.handleReady();
  }



  draw() {

    image(this.grimoireBackground, 0, 0, 600, 600);
    image(this.grimoire, 0, 0, 600, 391);

    if (this.state === GrimoireState.INSTRUCTIONS)
      this.drawInstructions();
    else if (this.state === GrimoireState.SHOW_CLUES)
      this.drawClues();
    else if (this.state === GrimoireState.PLACE_MARKERS)
      this.drawMarkers();
    else if (this.state === GrimoireState.HIDE_CLUES) {
      this.drawMarkers();
      this.goalCover.draw();
    }
    else {
      // image(cluePicture, 0, 0);

    }


  }

  handleInstructions() {
    this.continueButton.updateButton();
    if (this.continueButton.released === true) {
      this.state = GrimoireState.SHOW_CLUES;
    }
  }

  drawInstructions() {


    this.continueButton.drawButton();

    push();
    stroke(97, 64, 38);
    fill(255, 250, 214);
    strokeWeight(3)
    rect(5, 375, 590, 220)
    textSize(19);
    textAlign(LEFT);
    stroke(41, 25, 13);
    text("In the next screen, the traitor will have the chance to pick up to 2 doors to include in this level. Step (1) All players except the Grimoire should now close their eyes. Step (2) Grimoire count down from 3 and ask the traitor to open their eyes. Step (3) On the next screen the traitor will indicate the number of the card with their fingers and the Grimoire will select the door they choose with the mouse. Step (4) When the traitor is finished selecting doors, they should close their eyes and the Grimoire should select next on the screen.",
      20, 380, 580);

    pop();
  }

  handleClues() {
    this.clueDoor1.update();
    this.clueDoor2.update();
    this.goalDoor.update();

    if (
      this.clueDoor1.x === this.clueDoor1.tx &&
      this.clueDoor1.y === this.clueDoor1.ty &&
      this.clueDoor2.x === this.clueDoor2.tx &&
      this.clueDoor2.y === this.clueDoor2.ty &&
      this.goalDoor.x === this.goalDoor.tx &&
      this.goalDoor.y === this.goalDoor.ty
    )
      this.state = GrimoireState.PLACE_MARKERS;
  }

  drawClues() {
    push();
    fill(255);
    stroke(0);

    // Hint cards
    this.clueDoor1.draw();
    this.clueDoor2.draw();


    // Goal Card
    this.goalDoor.draw();


    pop();


  }

  handleMarkers() {
    this.nextButton.updateButton();
    this.backButton.updateButton();
    if (this.butterflyMarker1.placed === false)
      // No markers placed
      this.butterflyMarker1.update();
    else if (this.butterflyMarker2.placed === false)
      // Only one marker is placed
      this.butterflyMarker2.update();
    if (this.butterflyMarker1.placed === true) {
      // Once one is placed, they can move on
      if(this.nextButton.released)
        this.state = GrimoireState.HIDE_CLUES;
      if(this.backButton.released){
        this.butterflyMarker2.placed = false;
        this.butterflyMarker1.placed = false;

      }
    }
  }

  drawMarkers() {
    this.drawClues();
    this.nextButton.drawButton();
    this.backButton.drawButton();

    // Draw the markers
    this.butterflyMarker1.draw();
    if ((this.butterflyMarker1.placed === true && this.state === GrimoireState.PLACE_MARKERS) || (this.butterflyMarker2.placed === true))
      this.butterflyMarker2.draw();
  }

  coverWinningDoor() {
    this.goalCover.update();

    if (
      this.goalCover.x === this.goalCover.tx &&
      this.goalCover.y === this.goalCover.ty
    ) {
      if (this.done === false) {
        // Temporarily hide cursor before capture
        setTimeout(() => {
          showCursor = false;
          // Redraw one clean frame without cursor
          this.draw();

          // Capture the screenshot
          cluePicture = get(17, 17, 566, 333);

          // Bring cursor back
          showCursor = true;
        }, 100); // small delay to ensure frame is fully drawn
      }

      this.done = true;
    }
  }

  handleReady(){
    // Check if the continue button is hit


    // If the back button is hit, go back to placing the markers

  }

  drawReady(){
    // Draw the buttons
  }

}