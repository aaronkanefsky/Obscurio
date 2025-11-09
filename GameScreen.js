class GameScreen {
  constructor(game) {
    this.game = game;
    this.gameDoors = shuffle(this.doors);
    this.exit = null;
    this.level = 1;
    this.states = [grimoireCluesScreen = new GrimoireCluesScreen(), traitorPickScreen = new TraitorPickScreen(), showGrimoireScreen = new ShowGrimoireScreen(), pickExitScreen = new pickExitScreen()];
    this.gameState = grimoireCluesScreen;
  }

  changeState(x) {
    this.gameState = x;
  }
}
