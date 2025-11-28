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
    this.menuFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf');
    this.doorPicks = 0;
    this.nextButton = null;
    this.cluesShowing = true;
    this.cluesButton = null;
    this.closeCluesButton = null;
    this.grimoireBackground;
    this.lastClick = 0;
  }

  /**
   * @description Behavior on state entry
   */
  enter() {
    this.nextButton = new Button(480, 550, 80, 30, 'Next', 20, this.menuFont, this.buttonColor);
    this.cluesButton = new Button(480, 490, 80, 30, 'Clues', 20, this.menuFont, this.buttonColor);
    this.closeCluesButton = new Button(525, 122.5, 25, 25, 'X', 20, this.menuFont, this.buttonColor);
    // Screen Background
    this.grimoireBackground = loadImage(ASSET_PATH + 'images/GrimoireScreenBackground.png'); // Sourced from: https://www.etsy.com/listing/1496891045/vintage-grimoire-paper-blank-spell-pages

    if(this.folioDoors.length < 8) {
      for(let i = this.folioDoors.length; i < 8; i++) {
        if(i < 3) {
          this.folioDoors.push(new FolioObj((i*180) + 120,170,this.gameLoop.gameDoors.pop()));
        }
        else if(i < 6) {
          this.folioDoors.push(new FolioObj(((i-3)*180) + 120,340,this.gameLoop.gameDoors.pop()));
        }
        else {
          this.folioDoors.push(new FolioObj(((i-6)*180) + 120,510,this.gameLoop.gameDoors.pop()));
        }
      }
    }
  }

  /**
   * @description Behavior while in traitor pick game state
   */
  update() {
    if(this.cluesShowing === false) {
      this.cluesButton.updateButton();
      this.nextButton.updateButton();
    }
    else {
      this.closeCluesButton.updateButton();
    }

    if (this.closeCluesButton.released === true && this.cluesShowing === true) {
      this.cluesShowing = false;
    } 
    else if (this.cluesButton.released === true && this.cluesShowing === false) {
      this.cluesShowing = true;
    }
    
    if(mouseIsPressed && this.cluesShowing === false && frameCount - this.lastClick >= 20) {
      this.lastClick = frameCount;
      for(let k = 0; k < this.folioDoors.length; k++) {
        //console.log("Door:",k,", x-position:",this.folioDoors[k].x,", y-position:",this.folioDoors[k].y,", selected:",this.folioDoors[k].selected);
        if((dist(mouseX,mouseY,this.folioDoors[k].x,this.folioDoors[k].y) <= 80) && this.folioDoors[k].selected === false && this.doorPicks < 2) {
          this.folioDoors[k].selected = true;
          this.doorPicks++;
        }
        else if((dist(mouseX,mouseY,this.folioDoors[k].x,this.folioDoors[k].y) <= 80) && this.folioDoors[k].selected === true) {
          this.folioDoors[k].selected = false;
          this.doorPicks--;
        }
      }
    }
  }

  /**
   * @description Behavior on state exit
   */
  exit() {
    this.nextButton = null;
    this.cluesButon = null;
    this.closeCluesButton = null;
    
    // find the selected doors and add them to level doors, then replace them in te folio with new doors for next level's traitor pick
    for(let i = 0; i < this.folioDoors.length; i++) {
      if(this.folioDoors[i].selected === true) {
        this.gameLoop.levelDoors.push(new DoorObj(this.gameLoop, 0, 0, 0, 0, 0, 0, 0, this.folioDoors[i].door));
        if(i < 3) {
          this.folioDoors.splice(i,1,new FolioObj((i*180) + 120,170,this.gameLoop.gameDoors.pop()));
        }
        else if(i < 6) {
          this.folioDoors.splice(i,1,new FolioObj(((i-3)*180) + 120,340,this.gameLoop.gameDoors.pop()));
        }
        else {
          this.folioDoors.splice(i,1,new FolioObj(((i-6)*180) + 120,510,this.gameLoop.gameDoors.pop()));
        }
      }
    }
    
    this.doorPicks = 0;
  }

  /**
   * @description Draws the traitor pick to the screen
   */
  draw() {
    image(this.grimoireBackground, 0, 0, 600, 600);
    this.nextButton.drawButton();
    for(let d of this.folioDoors) {
      d.draw();
    }

    push();
    stroke(0);
    rectMode(CENTER);
    strokeWeight(3);
    fill(this.buttonColor);
    rect(300, 40, 550, 50, 15);
    fill(0);
    noStroke();
    textFont(this.menuFont);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(`Traitor you can select up to ${2 - this.doorPicks} more doors!`, 300, 40);
    for(let k = 0; k < this.folioDoors.length; k++) {
      stroke(0);
      rectMode(CENTER);
      strokeWeight(2);
      fill(this.buttonColor);
      rect(this.folioDoors[k].x, this.folioDoors[k].y-75, 25, 25, 15);
      fill(0);
      noStroke();
      textFont(this.menuFont);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(k+1, this.folioDoors[k].x, this.folioDoors[k].y-75);
    }
    if (this.cluesShowing) {
      rectMode(CENTER);
      strokeWeight(3);
      fill(this.buttonColor);
      stroke(0);
      rect(300, 300, 500, 400, 15);
      this.closeCluesButton.drawButton();
      noStroke();
      textAlign(CENTER, CENTER);
      fill(0);
      textSize(30);
      textFont(this.menuFont);
      text('Grimoire Clues', 300, 125);
      imageMode(CENTER);
      image(this.gameLoop.grimoireClues, 300, 300, 450, 265);
    } else this.cluesButton.drawButton();
    pop();
  }
}
