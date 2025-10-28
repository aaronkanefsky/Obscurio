class GameObject {
  constructor() {
    this.playerCount = 2;
    this.players = [];
    this.characters = [];
    //this.screen = [new titleScreen(), new playCountScreen(), new charSelectScreen()];
    this.currScreen = 0;
  }
  
  changeScreen(x) {
    this.currScreen = x;
  }
}