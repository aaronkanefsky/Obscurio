class GameObject {
  constructor() {
    this.playerCount = 2;
    this.players = [];
    this.characters = [];
    // Populate characters
    for (let i = 0; i < 7; i++) {
      let c = new Character(i);
      this.characters.push(c);  // <--- IMPORTANT
    }
  }
}
