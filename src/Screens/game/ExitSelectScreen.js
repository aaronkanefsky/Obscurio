class ExitSelectScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.menuFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf')
    this.buttonColor = color(143, 86, 59);
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
    this.gameLoop.levelDoors.push(new DoorObj(this.gameLoop,0,0,0,0,0,0,1,this.gameLoop.exitDoor.image));
    let randDoors = 6 - this.gameLoop.levelDoors.length;
    for(let i = 0; i < randDoors; i++) {
      this.gameLoop.levelDoors.push(new DoorObj(this.gameLoop,0,0,0,0,0,0,0,this.gameLoop.gameDoors.pop()));
    }
    this.currLevelDoors = shuffle(this.gameLoop.levelDoors);
    this.currLevelDoors[5].set(800,83,3,0,518,83);
    this.currLevelDoors[4].set(-200,83,3,0,82,83);
    this.currLevelDoors[3].set(800,298,3,0,518,298);
    this.currLevelDoors[2].set(-200,298,3,0,82,298);
    this.currLevelDoors[1].set(800,519,3,0,518,519);
    this.currLevelDoors[0].set(-200,519,3,0,82,519);
    
    this.gameLoop.levelDoors = [];
    this.cluesShowing = true;

    // Initialize buttons
    this.cluesButton = new Button(385, 580, 60, 30, 'Clues', 15, this.menuFont, this.buttonColor);
    this.closeCluesButton = new Button(525, 122.5, 25, 25, 'X', 20, this.menuFont, this.buttonColor);

    // Initialize game board tilemap
    for(let i = 0; i < this.tilemap.length; i++) {
      for(let j = 0; j < this.tilemap[i].length; j++) {
        switch(this.tilemap[i][j]) {
          // full wall
          case 'w': this.walls.push(new WallObj((j*30)+150,(i*30),1));
            break;
          // left half wall
          case 'l': this.walls.push(new WallObj((j*30)+150,(i*30),2));
            break;
          // right half wall
          case 'r': this.walls.push(new WallObj((j*30)+165,(i*30),2));
            break;
          // top half wall
          case 't': this.walls.push(new WallObj((j*30)+150,(i*30),3));
            break;
          // bottom half wall
          case 'b': this.walls.push(new WallObj((j*30)+150,(i*30)+15,3));
            break;
        }
      }
    }

    // Initialize player location at starting position
    for(let i = 0; i < this.gameLoop.game.players.length; i ++) {
      this.gameLoop.game.players[i].x = 285;
      this.gameLoop.game.players[i].y = 570;
    }
  }

  update() {
    if(this.cluesShowing === false) {
      this.cluesButton.updateButton();
    }
    else {
      this.closeCluesButton.updateButton();
    }

    if(this.closeCluesButton.released === true && this.cluesShowing === true) {
      this.cluesShowing = false;
    }
    else if(this.cluesButton.released === true && this.cluesShowing === false) {
      this.cluesShowing = true;
    }

    for(let d of this.currLevelDoors) {
      d.update();
    }

    // Door targets
    let door6 = new p5.Vector(250, 127.5);
    let door5 = new p5.Vector(50, 127.5);
    let door4 = new p5.Vector(250, 315);
    let door3 = new p5.Vector(50, 315);
    let door2 = new p5.Vector(250, 517.5);
    let door1 = new p5.Vector(50, 517.5);
    
    if(mouseIsPressed) {
      // Check to see if door has been clicked and which one
      // Set the character's path to the door and increment the door's count to indicate how many times it got picked
      // Set the door as the target
      // Check door 6
      if(dist(mouseX, mouseY, 518, 83) < 80 && this.targetSet == false) {
        this.currLevelDoors[5].count++;
        this.target = door6;
        this.targetSet = true;
        //this.gameLoop.game.players[this.playerInd - 1].recalculatePathToDoor();
      }
      // Check door 5
      else if(dist(mouseX, mouseY, 82, 83) < 80 && this.targetSet == false) {
        this.currLevelDoors[4].count++;
        this.target = door5;
        this.targetSet = true;
        //this.gameLoop.game.players[this.playerInd - 1].recalculatePathToDoor();
      }
      // Check door 4
      else if(dist(mouseX, mouseY, 518, 298) < 80 && this.targetSet == false) {
        this.currLevelDoors[3].count++;
        this.target = door4;
        this.targetSet = true;
        //this.gameLoop.game.players[this.playerInd - 1].recalculatePathToDoor();
      }
      // Check door 3
      else if(dist(mouseX, mouseY, 82, 298) < 80 && this.targetSet == false) {
        this.currLevelDoors[2].count++;
        this.target = door3;
        this.targetSet = true;
        //this.gameLoop.game.players[this.playerInd - 1].recalculatePathToDoor();
      }
      // Check door 2
      else if(dist(mouseX, mouseY, 518, 519) < 80 && this.targetSet == false) {
        this.currLevelDoors[1].count++;
        this.target = door2;
        this.targetSet = true;
        //this.gameLoop.game.players[this.playerInd - 1].recalculatePathToDoor();
      }
      // Check door 1
      else if(dist(mouseX, mouseY, 82, 519) < 80 && this.targetSet == false) {
        this.currLevelDoors[0].count++;
        this.target = door1;
        this.targetSet = true;
        //this.gameLoop.game.players[this.playerInd - 1].recalculatePathToDoor();
      }
    }
    
    // Once character reaches the door, increment the player index so the next player can go
    if(this.gameLoop.game.players[this.playerInd - 1].x === this.target.x && this.gameLoop.game.players[this.playerInd - 1].y === this.target.y && this.target !== null) {
      this.playerInd++;          // change player
      this.targetSet = false;    // reset target
      this.target.set(0,0);  // player starting target
    }

    // Update player location
    this.gameLoop.game.players[this.playerInd - 1].updatePlayer();
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
      this.gameLoop.game.players[i].position.set(0,0);
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
    background(0);
    push();
    noStroke();
    imageMode(CENTER);
    image(this.board, 300, 300, 300, 600);             // draw cropped game board
    
    // draw doors of current level
    for(let d of this.currLevelDoors) {
      d.draw();
    }

    if(this.cluesShowing == true) {
      rectMode(CENTER);
      strokeWeight(3);
      fill(this.buttonColor);
      strokeWeight(3);
      stroke(0);
      rect(300,300,500,400,15);
      this.closeCluesButton.drawButton();
      noStroke();
      textAlign(CENTER, CENTER);
      fill(0);
      textSize(30);
      textFont(this.menuFont);
      text('Grimoire Clues', 300, 125);
      imageMode(CENTER);
      image(this.gameLoop.grimoireClues, 300, 300, 450, 265);
    }
    else {
      this.cluesButton.drawButton();
    }

    rectMode(CENTER);
    strokeWeight(3);
    stroke(0);
    fill(this.buttonColor);
    rect(300, 30, 200, 50, 15);
    
    textSize(40);
    textAlign(CENTER,CENTER);
    textFont(this.menuFont);
    noStroke();
    fill(0);
    textSize(20);
    text(`Player ${this.playerInd} pick a door!`, 300, 30);
    pop();

    this.gameLoop.game.players[this.playerInd - 1].drawPlayer();
  }
}
