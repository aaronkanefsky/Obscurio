class GameScreen {
  constructor(game) {
    this.game = game;
    this.gameDoors = shuffle(this.doors);
    this.exit = null;
    this.level = 1;
    this.loopStates = [this.grimoireCluesScreen = new GrimoireCluesScreen(game), this.traitorPickScreen = new TraitorPickScreen(game), this.exitSelectScreen = new ExitSelectScreen(game)];
    this.gameLoopState = this.grimoireCluesScreen;
  }
  
  enter() {
    this.exit = this.gameDoors.pop();
    this.levelDoors.push(new doorObj(true,this.exit));
  }

  draw() {
    background(220);
    if(this.gameLoopState === this.loopStates.GRIMOIRE_CLUES_SCREEN) {
      handleGrimoireCluesScreen();
    }
    else if(this.gameLoopState === this.loopStates.TRAITOR_PICK_SCREEN) {
      handleTraitorPickScreen();
    }
    else {
      handleExitSelectScreen();
    }
  }

  handleGrimoireCluesScreen() {
    this.grimoireCluesScreen.update();
    this.grimoireCluesScreen.draw();

    if(this.grimoireCluesScreen.nextButton.released === true) {
      this.gameLoopState = this.loopStates.TRAITOR_PICK_SCREEN;
      this.grimoireCluesScreen.exit();
      this.traitorPickScreen.enter();
    }
  }

  handleTraitorPickScreen() {
    this.traitorPickScreen.update();
    this.traitorPickScreen.draw();

    if(this.traitorPickScreen.nextButton.released === true) {
      this.gameLoopState = this.loopStates.EXIT_SELECT_SCREEN;
      this.traitorPickScreen.exit();
      this.exitSelectScreen.enter();
    }
  }

  handleExitSelectScreen() {
    this.exitSelectScreen.update();
    this.exitSelectScreen.draw();

    if(this.exitSelectScreen.nextButton.released === true) {
      this.gameLoopState = this.loopStates.GRIMOIRE_CLUES_SCREEN;
      this.exitSelectScreen.exit();
      if(this.level > 6) {
        this.game.gameState = this.game.gameStates.WIN_SCREEN;
        this.game.winScreen.enter();
      }
      else if(this.cohesionTokens <= 0) {
        this.game.gameState = this.game.gameStates.LOSE_SCREEN;
        this.game.loseScreen.enter();
      }
      else {
        this.grimoireCluesScreen.enter();
      }
    }
  }
}
