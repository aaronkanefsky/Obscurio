/**
 * @class TraitorPickGameScreen
 * 
 * @description Game screen with a single next button and the blurred image as the background, draws 8 doors stored in folio of doors for traitor to pick from, highlights doors picked, up to 2 doors may be selected.
 */
class TraitorPickGameScreen {
  /**
   * 
   * @param {Game} game Reference to current game
   */
  constructor(game) {
    this.game = game;
    this.folioDoors = [];
    for(let i = 0; i < 8; i++) {
      if(i < 4) {
        this.folioDoors.push(new folioObj((i*50),200,this.game.gameDoors.pop()));
      }
      else {
        this.folioDoors.push(new folioObj((i*50),400,this.game.gameDoors.pop()));
      }
    }
    this.doorPicks = 0;
    this.nextButton = null;
  }

  /**
   * @description Behavior on state entry
   */
  enter() {
    this.nextButton = new Button(430, 570, 100, 40, 'Next', 20, this.game.menuFont, this.game.buttonColor);
  }

  /**
   * @description Behavior while in traitor pick game state
   */
  update() {
    if(mouseIsPressed) {
      for(let k = 0; k < this.folioDoors.length; k++) {
        if(dist(mouseX,mouseY,this.folioDoors[k].x + 25,this.folioDoors[k].y + 25) < 25 && this.folioDoors[k].selected === false && this.doorPicks < 2) {
          this.folioDoors[k].selected = true;
          this.doorPicks++;
        }
        else if(dist(mouseX,mouseY,this.folioDoors[k].x + 25,this.folioDoors[k].y + 25) < 25 && this.folioDoors[k].selected === true) {
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
    
    // find the selected doors and add them to level doors, then replace them in te folio with new doors for next level's traitor pick
    for(let i = 0; i < this.folioDoors.length; i++) {
      if(this.folioDoors[i].selected === true) {
        this.game.levelDoors.push(new doorObj(false,this.folioDoors[i].door));
        this.folioDoors.splice(i,1,this.game.gameDoors.pop());
      }
    }
    
    this.doorPicks = 0;
  }

  /**
   * @description Draws the traitor pick to the screen
   */
  draw() {
    textSize(40);
    textMode(CENTER);
    text(`Traitor you can select up to ${2 - this.doorsPicked} more doors!`, 300, 50);
    for(let d of this.folioDoors) {
      if(d.selected === true) {
          fill(255,255,0);
          circle(d.x + 25, d.y + 25, 54);
      }
      image(d.door, d.x, d.y, 50, 50);
    }
  }
}
