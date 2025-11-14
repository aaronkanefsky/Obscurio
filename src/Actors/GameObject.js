class GameObject {
  constructor() {
    this.playerCount = 2;
    this.players = [new Player(0,0), new Player(1,1)];
    //this.characters = [];
    //this.screen = [new titleScreen(), new playCountScreen(), new charSelectScreen()];
    this.currScreen = 0;
  }
  
  changeScreen(x) {
    this.currScreen = x;
  }
}