class ExitSelectScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.doorCount = [];
    this.currLevelDoors = [];
  }

  enter() {
    let randDoors = 5 - this.gameLoop.levelDoors;
    for(let i = 0; i < randDoors; i++) {
      this.gameLoop.levelDoors.push(new doorObj(i,0,false,this.gameLoop.gameDoors.pop()));
    }
  }

  update() {

  }

  exit() {
    for(let i = 0; i < this.gameLoop.levelDoors.length; i++) {
      if(this.gameLoop.levelDoors[i].exitCard === false && this.gameLoop.levelDoors[i].count > 0) {
        this.gameLoop.game.cohesionTokens -= this.gameLoop.levelDoors[i].count;
      }
      else if(this.gameLoop.levelDoors[i].exitCard === true && this.gameLoop.levelDoors[i].count > 0) {
        this.gameLoop.level++;
      }
    }
    // Remove doors used in this level from memory
    this.gameLoop.levelDoors = [];
  }

  draw() {
    
    textSize(30);
    textMode(CENTER);
    text(`Player ${this.ind} pick a door!`, 100, 300);
  }
}
