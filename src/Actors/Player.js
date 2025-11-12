class Player {
  constructor(player_num, char_num) {
    this.playerId = player_num;
    this.character = char_num;
    this.playerType = null;
    this.position = new p5.Vector(285,570);
  }

  updatePlayer() {

  }

  drawPlayer() {
    this.character.walk();
  }
}