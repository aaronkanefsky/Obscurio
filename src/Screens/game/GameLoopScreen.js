class GameLoopScreen {
  constructor(game, doorImgs) {
    this.game = game;
    this.doorImgs = doorImgs;
    this.gameDoors = [];
    this.exit = null;
    this.level = 1;
    this.cohesionTokens = 0;
    this.loopStates = [this.grimoireCluesScreen = new GrimoireCluesScreen(this), this.traitorPickScreen = new TraitorPickScreen(this), this.exitSelectScreen = new ExitSelectScreen(this)];
    this.gameLoopState = this.exitSelectScreen;
    this.levelDoors = [];
  }

  changeState(x) {
    this.gameLoopState = x;
  }
  
  enter() {
    this.gameDoors = shuffle(this.doorImgs);
    console.log("Door images loaded to gameDoors:",this.gameDoors.length);
    this.cohesionTokens = (this.game.playerCount * 3) + (this.game.playerCount - 2);    // Formula derived from beginner level cohesion token allocation given in Obscurio instructions
    if(this.game.playerCount === 2) this.cohesionTokens += 6;                           // Adjustment for 2 players
    if(this.game.playerCount === 3) this.cohesionTokens -= 1;                           // Adjustment for 3 players
    this.exit = this.gameDoors.pop();
    console.log("Exit door:",this.exit);
    this.levelDoors.push(new doorObj(true,this.exit));
    this.exitSelectScreen.enter();
  }

  draw() {
    background(220);
    if(this.gameLoopState === this.grimoireCluesScreen) {
      this.handleGrimoireCluesScreen();
    }
    else if(this.gameLoopState === this.traitorPickScreen) {
      this.handleTraitorPickScreen();
    }
    else {
      this.handleExitSelectScreen();
    }
  }

  exit() {
    this.game = null;
    this.gameDoors = [];
    this.exit = null;
    this.level = 1;
    this.grimoireCluesScreen.gameLoop = null;
    this.traitorPickScreen.folioDoors = [];
    this.traitorPickScreen.gameLoop = null;
    this.exitSelectScreen.gameLoop = null;
  }

  handleGrimoireCluesScreen() {
    this.grimoireCluesScreen.update();
    this.grimoireCluesScreen.draw();

    // if(this.grimoireCluesScreen.nextButton.released === true) {
    //   this.gameLoopState.changeState(this.traitorPickScreen);
    //   this.grimoireCluesScreen.exit();
    //   this.traitorPickScreen.enter();
    // }
  }

  handleTraitorPickScreen() {
    this.traitorPickScreen.update();
    this.traitorPickScreen.draw();

    if(this.traitorPickScreen.nextButton.released === true) {
      this.gameLoopState.changeState(this.exitSelectScreen);
      this.traitorPickScreen.exit();
      this.exitSelectScreen.enter();
    }
  }

  handleExitSelectScreen() {
    this.exitSelectScreen.update();
    this.exitSelectScreen.draw();

    /*if(this.exitSelectScreen.nextButton.released === true) {
      this.gameLoopState.changeState(this.grimoireCluesScreen);
      this.exitSelectScreen.exit();
      if(this.level > 6) {
        this.game.gameState = this.game.gameStates.WIN_SCREEN;
        this.exit();
        this.game.winScreen.enter();
      }
      else if(this.cohesionTokens <= 0) {
        this.game.gameState = this.game.gameStates.LOSE_SCREEN;
        this.exit();
        this.game.loseScreen.enter();
      }
      else {
        this.grimoireCluesScreen.enter();
      }
    }*/
  }
}
