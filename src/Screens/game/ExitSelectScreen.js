class ExitSelectScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.currLevelDoors = [];
    this.playerInd = 1;
    this.board = loadImage(ASSET_PATH + 'game_board_cropped.png');
    this.target;
  }

  enter() {
    this.target = new p5.Vector(285,570);
    let randDoors = 5 - this.gameLoop.levelDoors;
    for(let i = 0; i < randDoors; i++) {
      this.gameLoop.levelDoors.push(new doorObj(false,this.gameLoop.gameDoors.pop()));
    }
    this.currLevelDoors = shuffle(this.gameLoop.levelDoors);
    this.gameLoop.levelDoors = [];
  }

  update() {
    // Middle of door square check
    let door6 = p5.Vector(250,127.5);
    let door5 = p5.Vector(50,127.5);
    let door4 = p5.Vector(250,315);
    let door3 = p5.Vector(50,315);
    let door2 = p5.Vector(250,517.5);
    let door1 = p5.Vector(50,517.5);
    
    if(mouseIsPressed) {
      // Check to see if door has been clicked and which one
      // Set the character's path to the door and increment the door's count to indicate how many times it got picked
      // Check door 6
      if(mouseX > 230 && mouseX < 270 && mouseY > 90 && mouseY < 165) {
        this.currLevelDoors[5].count++;
        this.target = door6;
      }
      // Check door 5
      else if(mouseX > 30 && mouseX < 70 && mouseY > 90 && mouseY < 165) {
        this.currLevelDoors[4].count++;
        this.target = door5;
      }
      // Check door 4
      else if(mouseX > 230 && mouseX < 270 && mouseY > 270 && mouseY < 360) {
        this.currLevelDoors[3].count++;
        this.target = door4;
      }
      // Check door 3
      else if(mouseX > 30 && mouseX < 70 && mouseY > 270 && mouseY < 360) {
        this.currLevelDoors[2].count++;
        this.target = door3;
      }
      // Check door 2
      else if(mouseX > 230 && mouseX < 270 && mouseY > 480 && mouseY < 555) {
        this.currLevelDoors[1].count++;
        this.target = door2;
      }
      // Check door 1
      else if(mouseX > 30 && mouseX < 70 && mouseY > 480 && mouseY < 555) {
        this.currLevelDoors[0].count++;
        this.target = door1;
      }
    }
    // Once character reaches the door, increment the player index so the next player can go
    if(this.gameLoop.game.players[this.playerInd - 1].x === this.target.x && this.gameLoop.game.players[this.playerInd - 1].y === this.target.y) {
      this.playerInd++;
      this.target.set(285,570);  // player starting position
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

    // Reset target
    this.target = null;
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
