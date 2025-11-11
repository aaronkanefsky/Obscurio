class ExitSelectScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.currLevelDoors = [];
    this.playerInd = 1;
    this.board = loadImage(ASSET_PATH + 'images/game_board.png');
  }

  enter() {
    let randDoors = 5 - this.gameLoop.levelDoors;
    for(let i = 0; i < randDoors; i++) {
      this.gameLoop.levelDoors.push(new doorObj(false,this.gameLoop.gameDoors.pop()));
    }
    this.currLevelDoors = shuffle(this.gameLoop.levelDoors);
    this.gameLoop.levelDoors = [];
  }

  update() {

  }

  exit() {
    for(let i = 0; i < this.gameLoop.levelDoors.length; i++) {
      if(this.currLevelDoors[i].exitCard === false && this.currLevelDoors[i].count > 0) {
        this.gameLoop.game.cohesionTokens -= this.currLevelDoors[i].count;
      }
      else if(this.currLevelDoors[i].exitCard === true && this.currLevelDoors[i].count > 0) {
        this.gameLoop.level++;
      }
    }
    // Remove doors used in this level from memory
    this.currLevelDoors = [];

    // Reset player index
    this.playerInd = 1;
  }

  draw() {
    image(this.board,150,217,300,300);
    textSize(30);
    textMode(CENTER);
    text(`Player ${this.playerInd} pick a door!`, 100, 300);
  }
}
