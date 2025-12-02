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
    
    this.goalCover = new DoorObj(this.gameLoop,200, 500, 2, 5, 200, 360, -1, null);

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
    // Doors
    this.clueDoor1 = null;
    this.clueDoor2 = null;
    this.goalDoor = null;
    
    this.goalCover = null;

    // Butterfly markers
    this.butterflyMarker1 = null;
    this.butterflyMarker2 = null;

    // Screen Background
    this.grimoireBackground = null;

    // Buttons
    this.continueButton = null;
    this.nextButton = null;
    this.backButton = null;
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
    stroke(0);
    fill(97, 64, 38);
    strokeWeight(3)
    rect(5, 375, 590, 220, 7)
    textSize(19);
    textAlign(LEFT);
    stroke(0);
    strokeWeight(0.3);
    textFont("Helvetica Neue")
    textStyle(BOLD);
    fill(0);
    text("In the next part, the Grimoire will select up to two clues to give to the other players. Please note that the Traitor and Wizards will all be using these clues when picking their exit door. Use the left and right arrow keys to rotate the Butterfly Marker, giving the players a better chance to understand your clue. Once you have the proper place, left click to stick the marker to the clues. Good luck!",
    15, 390, 585);

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
          this.gameLoop.grimoireClues = get(17, 17, 566, 333);

          // Bring cursor back
          showCursor = true;
        }, 100); // small delay to ensure frame is fully drawn
      }

      this.done = true;
    }
  }

}
