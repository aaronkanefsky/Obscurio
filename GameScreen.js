class GameScreen {
  constructor(game) {
    this.game = game;
    this.gameDoors = shuffle(this.doors);
    this.exit = null;
    this.level = 1;
    this.states = [new GrimoireCluesScreen(), new TraitorPickScreen(), new ShowGrimoireScreen(), new pickExitScreen()];
    this.gameState = grimoireCluesScreen;
  }

  changeState(x) {
    this.gameState = x;
  }

  enter() {
    this.exit = this.gameDoors.pop();
    this.levelDoors.push(new doorObj(true,this.exit));
  }
}
