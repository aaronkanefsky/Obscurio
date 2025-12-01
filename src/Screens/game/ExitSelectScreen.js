class ExitSelectScreen {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.menuFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf');
    this.buttonColor = color(143, 86, 59);
    this.currLevelDoors = [];
    this.playerInd = 2;
    this.board = loadImage(ASSET_PATH + 'images/game_board_cropped.png');
    this.target = null;
    this.targetSet = false;
    this.tilemap = [
      "wwwwwwwwww",
      "wwww  wwww",
      "wwww  wwww",
      "w  w  w  w",
      "w gwlrwg w",
      "wb wlw  bw",
      "wwl  w rww",
      "www ww www",
      "www ww www",
      "w   ww w w",
      "w g    g w",
      "w        w",
      "wwww   www",
      "wwww   www",
      "wwww w  ww",
      "www  rw ww",
      "w     w  w",
      "w gw   g w",
      "ww w  w ww",
      "wwwwlrwwww",
    ];
    this.walls = [];
    this.cluesShowing = true;
    this.cluesButton = null;
    this.closeCluesButton = null;

    this.pathfinder = new Pathfinder(this.tilemap);

    // collect all goal tiles
    this.goalTiles = [];
    for (let y = 0; y < this.tilemap.length; y++) {
      for (let x = 0; x < this.tilemap[y].length; x++) {
        if (this.tilemap[y][x] === 'g') this.goalTiles.push({ x, y });
      }
    }

    this.doorTargets = []; // array of pixel positions for exit regions
    const TILE = 30;
    const OFFSET_X = 150; // same as your board offset
    for (let y = 0; y < this.tilemap.length; y++) {
      for (let x = 0; x < this.tilemap[y].length; x++) {
        if (this.tilemap[y][x] === 'g') {
          // compute center of the tile
          let centerX = OFFSET_X + x * TILE + TILE / 2;
          let centerY = y * TILE + TILE / 2;
          this.doorTargets.push(createVector(centerX, centerY));
        }
      }
    }


    // map doors 1-6 to specific goals
    this.doorGoalMap = [
      this.findGoalTile('left', 'bottom'),   // door1
      this.findGoalTile('right', 'bottom'),  // door2
      this.findGoalTile('left', 'middle'),   // door3
      this.findGoalTile('right', 'middle'),  // door4
      this.findGoalTile('left', 'top'),      // door5
      this.findGoalTile('right', 'top')      // door6
    ];
  }

  // Helper to select goal tiles by region
  findGoalTile(horizontal, vertical) {
    // horizontal: 'left' or 'right', vertical: 'top', 'middle', 'bottom'
    let candidates = this.goalTiles.slice();

    // sort by y to pick top/middle/bottom
    candidates.sort((a, b) => a.y - b.y);
    let verticalIndex;
    if (vertical === 'top') verticalIndex = 0;
    else if (vertical === 'middle') verticalIndex = Math.floor(candidates.length / 2);
    else verticalIndex = candidates.length - 1;

    let filteredY = candidates[verticalIndex].y;
    // filter candidates on the same row
    candidates = candidates.filter(g => g.y === filteredY);

    // pick leftmost or rightmost
    candidates.sort((a, b) => a.x - b.x);
    if (horizontal === 'left') return candidates[0];
    else return candidates[candidates.length - 1];
  }

  enter() {
    this.target = createVector(0, 0);
    window._exitSelectScreenInstance = this;

    // create doors
    this.gameLoop.levelDoors.push(new DoorObj(this.gameLoop, 0, 0, 0, 0, 0, 0, 1, this.gameLoop.exitDoor.image));
    let randDoors = 6 - this.gameLoop.levelDoors.length;
    for (let i = 0; i < randDoors; i++) {
      this.gameLoop.levelDoors.push(new DoorObj(this.gameLoop, 0, 0, 0, 0, 0, 0, 0, this.gameLoop.gameDoors.pop()));
    }
    this.currLevelDoors = shuffle(this.gameLoop.levelDoors);

    // initial door positions off-screen
    this.currLevelDoors[5].set(800, 83, 3, 0, 518, 83);
    this.currLevelDoors[4].set(-200, 83, 3, 0, 82, 83);
    this.currLevelDoors[3].set(800, 298, 3, 0, 518, 298);
    this.currLevelDoors[2].set(-200, 298, 3, 0, 82, 298);
    this.currLevelDoors[1].set(800, 519, 3, 0, 518, 519);
    this.currLevelDoors[0].set(-200, 519, 3, 0, 82, 519);

    this.gameLoop.levelDoors = [];
    this.cluesShowing = true;

    // buttons
    this.cluesButton = new Button(385, 580, 60, 30, 'Clues', 15, this.menuFont, this.buttonColor);
    this.closeCluesButton = new Button(525, 122.5, 25, 25, 'X', 20, this.menuFont, this.buttonColor);

    // walls
    for (let i = 0; i < this.tilemap.length; i++) {
      for (let j = 0; j < this.tilemap[i].length; j++) {
        switch (this.tilemap[i][j]) {
          case 'w': this.walls.push(new WallObj((j * 30) + 150, (i * 30), 1)); break;
          case 'l': this.walls.push(new WallObj((j * 30) + 150, (i * 30), 2)); break;
          case 'r': this.walls.push(new WallObj((j * 30) + 165, (i * 30), 2)); break;
          case 't': this.walls.push(new WallObj((j * 30) + 150, (i * 30), 3)); break;
          case 'b': this.walls.push(new WallObj((j * 30) + 150, (i * 30) + 15, 3)); break;
        }
      }
    }

    for (let i = 0; i < this.gameLoop.game.players.length; i++) {
      this.gameLoop.game.players[i].x = 285;
      this.gameLoop.game.players[i].y = 570;
    }

    this.pathfinder.setPath([]);

    // Attach exit target locations based on doorGoalMap
    for (let i = 0; i < this.currLevelDoors.length; i++) {
      const door = this.currLevelDoors[i];
      const goal = this.doorGoalMap[i]; // mapped goal tile

      const TILE = 30;
      const OFFSET_X = 150;

      door.exitX = OFFSET_X + goal.x * TILE + TILE / 2;
      door.exitY = goal.y * TILE + TILE / 2;
    }
  }

  selectDoorByIndex(i) {
    const player = this.gameLoop.game.players[this.playerInd - 1];
    if (!player) return;
    if (!this.currLevelDoors[i]) return;

    const goal = this.doorGoalMap[i];
    if (!goal) return;

    const TILE = 30;
    const OFFSET_X = 150;

    const startX = Math.floor((player.x - OFFSET_X) / TILE);
    const startY = Math.floor(player.y / TILE);
    const endX = goal.x;
    const endY = goal.y;

    const path = findAStarPath(startX, startY, endX, endY, this.tilemap);
    if (path && path.length > 0) {
      this.pathfinder.setPath(path);
      this.target = createVector(goal.x * TILE + OFFSET_X, goal.y * TILE);
      this.targetSet = true;
    }

    this.currLevelDoors[i].count++;
  }

  update() {
    if (this.cluesShowing === false) {
      this.cluesButton.updateButton();
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

    for (let d of this.currLevelDoors) d.update();

    const player = this.gameLoop.game.players[this.playerInd - 1];

    // update player movement ONLY IF path exists
    if (this.pathfinder.active()) {
      this.pathfinder.update(player);
    }

    // Check door collision only if player has stopped moving
    if (!this.pathfinder.active()) {
      for (let d of this.currLevelDoors) {
        if (dist(player.x, player.y, d.exitX, d.exitY) < 30) {
          this.playerInd++;
          this.targetSet = false;
          this.target.set(0, 0);
          this.pathfinder.setPath([]);
          return; // stop update early
        }
      }
    }
  }

  // inside ExitSelectScreen class
  handleMousePressed() {
    if (!this.currLevelDoors || this.currLevelDoors.length === 0) return;

    if(dist(mouseX, mouseY, 82, 83) <= 80 && this.cluesShowing == false) {
      this.selectDoorByIndex(4);
    }
    // Check door 5
    else if(dist(mouseX, mouseY, 518, 83) <= 80 && this.cluesShowing == false) {
      this.selectDoorByIndex(5);
    }
    // Check door 4
    else if(dist(mouseX, mouseY, 82, 298) <= 80 && this.cluesShowing == false) {
      this.selectDoorByIndex(2);
    }
    // Check door 3
    else if(dist(mouseX, mouseY, 518, 298) <= 80 && this.cluesShowing == false) {
      this.selectDoorByIndex(3);
    }
    // Check door 2
    else if(dist(mouseX, mouseY, 82, 519) <= 80 && this.cluesShowing == false) {
      this.selectDoorByIndex(0);
    }
    // Check door 1
    else if(dist(mouseX, mouseY, 518, 519) <= 80 && this.cluesShowing == false) {
      this.selectDoorByIndex(1);
    }
  }

  draw() {
    background(0);
    push();
    noStroke();
    imageMode(CENTER);
    image(this.board, 300, 300, 300, 600);

    for (let d of this.currLevelDoors) d.draw();

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
      text(`Cohesion Tokens:`+ this.gameLoop.cohesionTokens, 300, 465);
      imageMode(CENTER);
      image(this.gameLoop.grimoireClues, 300, 300, 450, 265);
    } else this.cluesButton.drawButton();

    rectMode(CENTER);
    strokeWeight(3);
    stroke(0);
    fill(this.buttonColor);
    rect(300, 30, 200, 50, 15);
    noStroke();
    fill(0);
    textSize(20);
    textFont(this.menuFont);
    textAlign(CENTER, CENTER);
    text(`Player ${this.playerInd} pick a door!`, 300, 30);
    pop();

    // Build a list of every door that exists


    const doors = [];
    if (this.gameLoop.exitDoor) doors.push(this.gameLoop.exitDoor);
    if (this.gameLoop.clueDoors) doors.push(...this.gameLoop.clueDoors);

    this.gameLoop.game.players[this.playerInd - 1].drawPlayer();
  }

  exit() {
    for(let d of this.currLevelDoors) {
      if(d.exitCard === 0 && d.count > 0) {
        this.gameLoop.cohesionTokens -= d.count;
      }
      else if(d.exitCard === 1 && d.count > 0) {
        this.gameLoop.level++;
      }
      console.log("Cohesion Tokens:",this.gameLoop.cohesionTokens);
      console.log("Level:",this.gameLoop.level);
    }
    
    // Remove doors used in this level from memory
    this.currLevelDoors = [];

    // Reset player positions
    for(let i = 0; i < this.gameLoop.game.players.length; i ++) {
      this.gameLoop.game.players[i].x = 0;
      this.gameLoop.game.players[i].y = 0;
    }

    // Reset player index
    this.playerInd = 2;

    // Reset target
    this.target = null;
    this.targetSet = false;

    // Reset walls
    this.walls = [];

    // Nullify buttons
    this.cluesButton = null;
    this.closeCluesButton = null;
  }
}
