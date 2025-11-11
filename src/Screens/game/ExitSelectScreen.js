class ExitSelectScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.currLevelDoors = [];
    this.playerInd = 1;
    this.board = loadImage(ASSET_PATH + 'game_board_cropped.png');
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
    if(mouseIsPressed) {
      // Check to see if door has been clicked and which one
      // Set the character's path to the door and increment the door's count to indicate how many times it got picked
      // Once character reaches the door, increment the player index so the next player can go
    }
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
    image(this.gameLoop.game.backgroundImage, 0, 0, 600, 600);  
    image(this.gameLoop.clues, 200, 150, 200, 100);    // draw Grimoire clues for players to see
    image(this.board, 200, 300, 100, 200);             // draw cropped game board
    push();
    rectMode(CENTER);
    strokeWeight(3);
    fill(this.gameLoop.game.buttonColor);
    rect(300, 50, 200, 100, 15);
    
    textSize(40);
    textAlign(CENTER,CENTER);
    textFont(this.gameLoop.game.menuFont);
    strokeWeight(1);
    fill(0);
    textSize(30);
    textMode(CENTER);
    text(`Player ${this.playerInd} pick a door!`, 300, 50);
  }
}
