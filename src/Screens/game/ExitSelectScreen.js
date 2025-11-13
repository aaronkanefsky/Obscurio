class ExitSelectScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.currLevelDoors = [];
    this.playerInd = 1;
    this.board = loadImage(ASSET_PATH + 'images/game_board_cropped.png');
    this.target;
    this.targetSet = false;
    this.tilemap = ["wwwwwwwwww",
                    "wwww  wwww",
                    "wwww  wwww",
                    "w tr  lt w",
                    "w  rlrl  w",
                    "wb rlrl bw",
                    "wwl  r rww",
                    "www ww www",
                    "www ww www",
                    "w tlrw t w",
                    "w        w",
                    "w        w",
                    "wwww   www",
                    "wwww   rww",
                    "wwwwlr rww",
                    "wwwl rlrww",
                    "w     l  w",
                    "w  r     w",
                    "wbbr  lbbw",
                    "wwwwlrwwww",
                   ];
    this.walls = [];
    this.cluesShowing = true;
    this.cluesButton;
    this.closeCluesButton;
  }

  enter() {
    this.target = new p5.Vector(0,0);
    let randDoors = 5 - this.gameLoop.levelDoors;
    for(let i = 0; i < randDoors; i++) {
      this.gameLoop.levelDoors.push(new doorObj(false,this.gameLoop.gameDoors.pop()));
    }
    this.currLevelDoors = shuffle(this.gameLoop.levelDoors);
    this.gameLoop.levelDoors = [];

    // Initialize buttons
    this.cluesButton = new Button(390, 10, 80, 40, 'See Clues', 20, this.gameLoop.game.menuFont, this.gameLoop.game.buttonColor);
    this.closeCluesButton = new Button(515, 110, 25, 25, 'X', 20, this.gameLoop.game.menuFont, this.gameLoop.game.buttonColor);

    // Initialize game board tilemap
    for(let i = 0; i < this.tilemap.length; i++) {
      for(let j = 0; j < this.tilemap[i].length; j++) {
        switch(this.tilemap[i][j]) {
          case 'w': this.walls.push(new wallObj((j*30)+150,(i*30),1));
            break;
          case 'l': this.walls.push(new wallObj((j*30)+150,(i*30),2));
            break;
          case 'r': this.walls.push(new wallObj((j*30)+15+150,(i*30),2));
            break;
          case 't': this.walls.push(new wallObj((j*30)+150,(i*30),3));
            break;
          case 'b': this.walls.push(new wallObj((j*30)+150,(i*30)+15,3));
            break;
        }
      }
    }

    // Initialize player location at starting position
    for(let i = 0; i < this.gameLoop.game.players.length; i ++) {
      this.gameLoop.game.players.position = new p5.Vector(300,585);
    }
  }

  update() {
    if(this.cluesShowing === false) {
      this.cluesButton.updateButton();
    }
    else {
      this.closeCluesButton.updateButton();
    }

    // Hover glow on doors:
    // Check door 6
    /*if(dist(mouseX, mouseY, 518, 83) < 80) {
      
    }
      // Check door 5
    else if(dist(mouseX, mouseY, 82, 83) < 80 && this.targetSet == false) {
      
    }
    // Check door 4
    else if(dist(mouseX, mouseY, 518, 298) < 80 && this.targetSet == false) {

    }
    // Check door 3
    else if(dist(mouseX, mouseY, 82, 298) < 80 && this.targetSet == false) {

    }
    // Check door 2
    else if(dist(mouseX, mouseY, 518, 519) < 80 && this.targetSet == false) {

    }
    // Check door 1
    else if(dist(mouseX, mouseY, 82, 519) < 80 && this.targetSet == false) {

    }*/

    // Door targets
    let door6 = p5.Vector(250, 127.5);
    let door5 = p5.Vector(50, 127.5);
    let door4 = p5.Vector(250, 315);
    let door3 = p5.Vector(50, 315);
    let door2 = p5.Vector(250, 517.5);
    let door1 = p5.Vector(50, 517.5);
    
    if(mouseIsPressed) {
      // Check to see if door has been clicked and which one
      // Set the character's path to the door and increment the door's count to indicate how many times it got picked
      // Set the door as the target
      // Check door 6
      if(dist(mouseX, mouseY, 518, 83) < 80 && this.targetSet == false) {
        this.currLevelDoors[5].count++;
        this.target = door6;
        this.targetSet = true;
      }
      // Check door 5
      else if(dist(mouseX, mouseY, 82, 83) < 80 && this.targetSet == false) {
        this.currLevelDoors[4].count++;
        this.target = door5;
        this.targetSet = true;
      }
      // Check door 4
      else if(dist(mouseX, mouseY, 518, 298) < 80 && this.targetSet == false) {
        this.currLevelDoors[3].count++;
        this.target = door4;
        this.targetSet = true;
      }
      // Check door 3
      else if(dist(mouseX, mouseY, 82, 298) < 80 && this.targetSet == false) {
        this.currLevelDoors[2].count++;
        this.target = door3;
        this.targetSet = true;
      }
      // Check door 2
      else if(dist(mouseX, mouseY, 518, 519) < 80 && this.targetSet == false) {
        this.currLevelDoors[1].count++;
        this.target = door2;
        this.targetSet = true;
      }
      // Check door 1
      else if(dist(mouseX, mouseY, 82, 519) < 80 && this.targetSet == false) {
        this.currLevelDoors[0].count++;
        this.target = door1;
        this.targetSet = true;
      }
    }
    
    // Once character reaches the door, increment the player index so the next player can go
    if(this.gameLoop.game.players[this.playerInd - 1].x === this.target.x && this.gameLoop.game.players[this.playerInd - 1].y === this.target.y) {
      this.playerInd++;          // change player
      this.targetSet = false;    // reset target
      this.target.set(0,0);  // player starting target
    }

    // Update player location
    this.gameLoop.game.players[playerInd - 1].updatePlayer();
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

    // Reset player positions
    for(let i = 0; i < this.gameLoop.game.players.length; i ++) {
      this.gameLoop.game.players.position = null;
    }

    // Reset player index
    this.playerInd = 1;

    // Reset target
    this.target = null;
    this.targetSet = false;

    // Reset walls
    this.walls = [];

    // Nullify buttons
    this.cluesButton = null;
    this.closeCluesButton = null;
  }

  draw() {
    push();
    noStroke();
    imageMode(CENTER);
    image(this.board, 300, 300, 300, 600);             // draw cropped game board

    // draw doors of current level
    image(this.currLevelDoors[5].door, 518, 83, 160, 160);
    image(this.currLevelDoors[4].door, 82, 83, 160, 160);
    image(this.currLevelDoors[3].door, 518, 298, 160, 160);
    image(this.currLevelDoors[2].door, 82, 298, 160, 160);
    image(this.currLevelDoors[1].door, 518, 519, 160, 160);
    image(this.currLevelDoors[0].door, 82, 519, 160, 160);

    if(this.cluesShowing == true) {
      rectMode(CENTER);
      strokeWeight(3);
      fill(this.gameLoop.game.buttonColor);
      rect(300,300,500,400);
      this.closeCluesButton.drawButton();
      noStroke();
      textAlign(CENTER, CENTER);
      fill(0);
      textSize(20);
      textFont(this.gameLoop.game.menuFont);
      text('Grimoire Clues', 300, 125);
      imageMode(CENTER);
      image(this.gameLoop.clues, 300, 300, 500, 300);
    }
    else {
      this.cluesButton.drawButton();
    }

    rectMode(CENTER);
    strokeWeight(3);
    fill(this.gameLoop.game.buttonColor);
    rect(300, 30, 200, 50, 15);
    
    textSize(40);
    textAlign(CENTER,CENTER);
    textFont(this.gameLoop.game.menuFont);
    noStroke();
    fill(0);
    textSize(20);
    text(`Player ${this.playerInd} pick a door!`, 300, 30);
    pop();

    this.gameLoop.game.players[playerInd - 1].drawPlayer();
  }
}
