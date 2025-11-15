class Player {
  constructor(player_num, char_num) {
    this.playerId = player_num;
    this.character = char_num;
    this.playerType = null;
    this.position = new p5.Vector(0,0);
    this.target = new p5.Vector(0,0);
    this.direction = 2;
    this.frameX = 0;
    this.frameY = 0;
    this.moveFrameCount = 0;
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

    image(walkFrame,this.position.x,this.position.y,30,30);

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

  updateDirection() {
    if(this.position.y > this.target.y) {
      this.direction = 0;
    }
    else if(this.position.x > this.target.x) {
      this.direction = 1;
    }
    else if(this.position.y < this.target.y) {
      this.direction = 2;
    }
    else if(this.position.x < this.target.x) {
      this.direction = 3;
    }
  }
  
  updatePlayer() {
    this.updateDirection();
  }

  drawPlayer() {
    this.walk();
  }
}