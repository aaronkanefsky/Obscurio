class GameObject {
  constructor() {
    this.playerCount = 2;
    this.players = [];
    this.characters = [];
    // Populate characters
    for (let i = 0; i < 7; i++) {
      this.characters.push(new Character(i));  // <--- IMPORTANT
    }
  }
}