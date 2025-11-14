class Player {
  constructor(player_num, char_num) {
    this.game = this.game;
    this.playerId = player_num;
    this.character = char_num;
    this.playerType = null;
    this.position = new p5.Vector(0,0);
  }

  updatePlayer() {

  }

  drawPlayer() {
    characters[this.character].walk(this.position.x,this.position.y);
  }
}