// Global variables
const tileWidth = 30;
const screenCols = 10;
const screenRows = 20;
const screenWidth = tileWidth * screenCols;
const screenHeight = tileWidth * screenRows;

class Player {
  constructor(player_num, char_num) {
    this.playerId = player_num;
    this.character = char_num;
    this.playerType = null;
    this.x = 0;
    this.y = 0;
    this.target = new p5.Vector(0,0);
    this.direction = 2;
    this.speed = 1;
    this.frameX = 0;
    this.frameY = 0;
    this.moveFrameCount = 0;
    this.path = [];
    this.pathPosIndex = 0;
  }

  walk() {
    if(this.moveFrameCount % 6 === 0) {
      this.frameX = (this.frameX + 1) % 8;
    }
    
    this.frameY = this.direction;

    let charWalkWidth = 512/8;
    let charWalkHeight = 256/4;
    let x_pos = this.frameX * charWalkWidth;
    let y_pos = this.frameY * charWalkHeight;

    let walkFrame = charWalk[this.character].get(x_pos, y_pos, charWalkWidth, charWalkHeight);

    image(walkFrame,this.x - charWalkWidth/4,this.y - charWalkWidth/4,30,30);

    this.moveFrameCount++;
  }
  
  spell() {
    if(this.moveFrameCount % 6 === 0) {
      this.frameX = (this.frameX + 1) % 7;
    }
    
    this.frameY = this.direction;

    let charSpellWidth = 448/7;
    let charSpellHeight = 256/4;
    let x_pos = this.frameX * charSpellWidth;
    let y_pos = this.frameY * charSpellHeight;

    let spellFrame = charSpell[this.character].get(x_pos, y_pos, charSpellWidth, charSpellHeight);

    image(spellFrame,this.x,this.y,30,30);

    this.moveFrameCount++;
  }

  /**
    * @description Behavior when changing direction
    */
  updateDirection() {
    if(game.exitSelectScreen.targetSet === true) {
      if(this.y > this.target.y) {
        this.direction = 0;   // faces upwards direction
      }
      else if(this.x > this.target.x) {
        this.direction = 1;   // faces left
      }
      else if(this.y < this.target.y) {
        this.direction = 2;   // faces downward direction
      }
      else if(this.x < this.target.x) {
        this.direction = 3;   // faces right
      }
    }
    else {
      this.direction = 2;   // faces out
    }
  }
  
  updatePlayer() {
    this.updateDirection();
    if (this.path && this.path.length > 0) {
      // follow path
      // find next target
      if (this.pathPosIndex >= this.path.length) {
        this.path = [];
        this.pathPosIndex = 0;
      } else {
        const node = this.path[this.pathPosIndex];
        //const target = tileCenter(node.col, node.row);
        const vx = this.target.x - this.x;
        const vy = this.target.y - this.y;
        const distTo = Math.hypot(vx, vy);
        if (distTo < 1.2) {
          this.pathPosIndex++;
        } else {
          const nx = (vx / distTo) * this.speed;
          const ny = (vy / distTo) * this.speed;
          // check collisions with walls simple way: if new pos within wall tile, stop and abandon path (will recalc later)
          const newX = this.x + nx;
          const newY = this.y + ny;
          const tile = worldToTile(newX, newY);
          if (inBounds(tile.col, tile.row) && game.exitSelectScreen.tileMap[tile.row][tile.col] !== 'w') {
            this.x = newX; this.y = newY;
          } else {
            // If collision, clear the path and check again
            this.path = [];
            this.pathPosIndex = 0;
          }
        }
      }
    } 
  }

  drawPlayer() {
    this.walk();
  }

  /**
   * @description Runs A* search on a grid made by aStarSearchGrid() to build a
   * path from the player to the door chosen
   */
  recalculatePathToDoor() {
    // Setup walkable map and run A*
    const gridWall = aStarSearchGrid();
    const start = worldToTile(this.x, this.y);
    const goal = worldToTile(game.exitSelectScreen.target.x, game.exitSelectScreen.target.y);
    if (!inBounds(start.col, start.row) || !inBounds(goal.col, goal.row)) {
      this.path = [];
      return;
    }

    // If either start or goal inside a wall, no path
    if (game.exitSelectScreen.tileMap[start.row][start.col] === 'w' || game.exitSelectScreen.tileMap[goal.row][goal.col] === 'w') {
      this.path = [];
      return;
    }

    const path = aStar(gridWall, start.col, start.row, goal.col, goal.row);
    if (path && path.length > 0) {
      // path is list of {col,row} starting at start tile. drop the first node (current tile) to move to next
      if (path.length > 1) {
        path.shift(); // skip current tile
        this.path = path;
        this.pathPosIndex = 0;
      } else {
        this.path = [];
      }
    } else {
      this.path = [];
    }
  }
}

/**
 * @description Creates object for the center of the tile
 * 
 * @param {Number} col The column of the tile to check
 * @param {Number} row The row of the tile to check
 * 
 * @returns Coordinates object for the x and y location of the center of a tile
 */
function tileCenter(col, row) {
  return { x: col * tileWidth + tileWidth / 2, y: row * tileWidth + tileWidth / 2 };
}

/**
 * @description Checks if the tile is within the bounds of the screen
 * 
 * @param {Number} col The column to use for the boundary check
 * @param {Number} row The row to use for the boundary check
 * 
 * @returns true if the tile is in the bounds, false if not
 */
function inBounds(col, row) {
  return col >= 0 && col < screenCols && row >= 0 && row < screenRows;
}

/**
 * @description Translates a coordinate to its row and column
 * 
 * @param {Number} x The x coordinate to translate to a tile
 * @param {Number} y The y coordinate to translate to a tile
 * 
 * @returns column, row object
 */
function worldToTile(x, y) {
  const col = floor(constrain(x, 0, width - 1) / tileWidth);
  const row = floor(constrain(y, 0, height - 1) / tileWidth);
  return { col: col, row: row };
}

/**
 * @description A* Search grid builder for the enemies
 * @returns grid for the enemies to use for A* Search
 */
function aStarSearchGrid() {
  const grid = Array.from({ length: screenRows }, (_, row) => Array(screenCols).fill(0));
  for (let row = 0; row < screenRows; row++) {
    for (let col = 0; col < screenCols; col++) {
      grid[row][col] = (game.exitSelectScreen.tileMap[row][col] === 'w') ? 1 : 0; // 1 = wall
    }
  }
  return grid;
}

/**
 * @description Computes all tiles within a bounding box defined
 * by pixel coordinates for collision detection
 * 
 * @param {Object} bbox Bounding box for the various game objects
 * @returns {Array} Array containing the tiles in the bounding box
 */
function tilesInBBox(bbox) {
  const c1 = floor(constrain(bbox.x1, 0, width - 1) / tileWidth);
  const r1 = floor(constrain(bbox.y1, 0, height - 1) / tileWidth);
  const c2 = floor(constrain(bbox.x2, 0, width - 1) / tileWidth);
  const r2 = floor(constrain(bbox.y2, 0, height - 1) / tileWidth);
  const out = [];
  for (let row = r1; row <= r2; row++) {
    for (let col = c1; col <= c2; col++) {
      if (inBounds(col, row)) out.push({ col, row });
    }
  }
  return out;
}
