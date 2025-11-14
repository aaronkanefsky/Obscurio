class Character {
  constructor(charID) {
    this.characterID = charID;
    this.characterTaken = false;
    this.characterImg = null;
    this.direction = 2;
    this.frameX = 0;
    this.frameY = 0;
    this.moveFrameCount = 0;
    this.flipped = false;
    this.isFlipping = false;
    this.flipProgress = 0;
  }
  walk(x,y) {
    if(this.moveFrameCount % 6 === 0) {
      this.frameX = (this.frameX + 1) % 8;
    }
    
    this.frameY = this.direction;

    let charWalkWidth = 512/8;
    let charWalkHeight = 256/4;
    let x_pos = this.frameX * charWalkWidth;
    let y_pos = this.frameY * charWalkHeight;

    let walkFrame = charWalk[this.characterID].get(x_pos, y_pos, charWalkWidth, charWalkHeight);

    image(walkFrame,x,y,30,30);

    this.moveFrameCount++;
  }
  
  spell(x,y) {
    if(this.moveFrameCount % 6 === 0) {
      this.frameX = (this.frameX + 1) % 7;
    }
    
    this.frameY = this.direction;

    let charSpellWidth = 448/7;
    let charSpellHeight = 256/4;
    let x_pos = this.frameX * charSpellWidth;
    let y_pos = this.frameY * charSpellHeight;

    let spellFrame = charSpell[this.characterID].get(x_pos, y_pos, charSpellWidth, charSpellHeight);

    image(spellFrame,x,y,30,30);

    this.moveFrameCount++;
  }
}
