/**
 * @class TraitorPickScreen
 * 
 * @description Game screen with a single next button and the blurred image as the background, draws 8 doors stored in folio of doors for traitor to pick from, highlights doors picked, up to 2 doors may be selected.
 */
class TraitorPickScreen {
  /**
   * 
   * @param {Game} game Reference to current game
   */
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.folioDoors = [];
    this.buttonColor = color(97, 64, 38);
    this.nextButton = null;
    this.hintButton = null;
    this.doorsPicked = 0;
    this.font = null;
    this.backgroundImg = null;
    this.frozen = null;
    this.isClueShowing = 0; // 0: false, 1: true (oneshot), 2: true (hold)
  }

  /**
   * @description Behavior on state entry
   */
  enter() {
    this.font = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf');
    this.backgroundImg = loadImage(ASSET_PATH + 'images/TraitorBackground.jpg');
    this.nextButton = new Button(430, 570, 100, 40, 'Next', 20, this.font, this.buttonColor);
    this.hintButton = new Button(300, 570, 100, 40, 'Hint', 20, this.font, this.buttonColor);
  }

  /**
   * @description Behavior on state exit
   */
  exit() {
    this.nextButton = null;

    // find the selected doors and add them to level doors, then replace them in te folio with new doors for next level's traitor pick
    for (let i = 0; i < this.folioDoors.length; i++) {
      if (this.folioDoors[i].selected === true) {
        this.gameLoop.levelDoors.push(new doorObj(false, this.folioDoors[i].door));
        this.folioDoors.splice(i, 1, this.gameLoop.gameDoors.pop());
      }
    }

    this.doorPicks = 0;
  }

  /**
   * @description Behavior while in traitor pick game state
   */
  update() {
    this.hintButton.updateButton();
    this.nextButton.updateButton();
    if(this.hintButton.released === true){

      this.frozen = get();
      console.log(this.isClueShowing)
    }
    if(this.isClueShowing === 1){
      this.isClueShowing = 2;
    }
  }

  /**
   * @description Draws the traitor pick to the screen
   */
  draw() {
    image(this.backgroundImg, 0, 0, 600, 600)
    textSize(40);
    textFont(this.font);
    textAlign(CENTER);
    text(`Traitor you can select up to 2 doors to swap into the game!\nTry to throw the Wizards off!`, 0, 50, 580, 580);
    if (this.isClueShowing === 0) {
      for (let d of this.folioDoors) {
        d.update()
        d.draw();
      }
    }
    else{
      image(this.frozen, 0, 0);
    }
    this.nextButton.drawButton();
    this.hintButton.drawButton();
  }
}
