class GameLoopScreen {
  constructor(game) {
    this.game = game;
    this.gameDoors = [];
    for (let i = 0; i < 66; i++) {
        this.gameDoors.push(loadImage(ASSET_PATH + "images/door" + i + ".png"));
    }
    this.exitDoor = null;
    this.clueDoors = [];
    this.level = 1;
    this.cohesionTokens = 0;
    this.loopStates = [];
    this.characters = [];
    this.gameLoopState = 0;
    this.levelDoors = [];
    this.exitImg = null;
    this.grimoireClues = loadImage(ASSET_PATH + 'images/grimoire.png');
  }

  changeState(x) {
    this.gameLoopState = x;
  }

  enter() {
    this.loopStates = [
      this.grimoireCluesScreen = new GrimoireCluesScreen(this),
      this.grimoireReveal = new BufferScreen("Player 1\nYou are the Grimoire", this),
      this.closeEyes = new BufferScreen("All other players close your eyes", this),
      this.traitorReveal = new BufferScreen("Player " + floor(random(2, this.game.playerCount + 1)) + " is the Traitor. Silently indicate to them that they are the traitor!", this),
      this.traitorOpenEyes = new BufferScreen("Grimoire, instruct the traitor to open their eyes. Press 'continue' once they have done so.", this),
      this.openEyes = new BufferScreen("All players open your eyes", this),
      this.traitorPickScreen = new TraitorPickScreen(this),
      this.exitSelectScreen = new ExitSelectScreen(this),
    ];

    this.gameDoors = shuffle(this.gameDoors);
    this.cohesionTokens = (this.game.playerCount * 3) + (this.game.playerCount - 2);    // Formula derived from beginner level cohesion token allocation given in Obscurio instructions
    if (this.game.playerCount === 2) this.cohesionTokens += 6;                           // Adjustment for 2 players
    if (this.game.playerCount === 3) this.cohesionTokens -= 1;                           // Adjustment for 3 players


    // Randomize the order of doors to be used
    this.exitDoor = new DoorObj(this, 200, 500, 2, 5, 200, 360, 1, this.gameDoors.pop());
    this.clueDoors.push(new DoorObj(this, -203, -45, 5, 3, 57, 108, 0, this.gameDoors.pop()));
    this.clueDoors.push(new DoorObj(this, 652, -30, 5, 2, 327, 106, 0, this.gameDoors.pop()));
    this.gameLoopState = this.grimoireReveal;
  }

  draw() {
    background(220);
    if (this.gameLoopState === this.grimoireReveal) {
      this.handleGrimoireReveal();
    }
    else if (this.gameLoopState === this.closeEyes) {
      this.handleCloseEyes();
    }
    else if (this.gameLoopState === this.traitorReveal) {
      this.handleTraitorReveal();
    }
    else if (this.gameLoopState === this.grimoireCluesScreen) {
      this.handleGrimoireCluesScreen();
    }
    else if (this.gameLoopState === this.traitorOpenEyes) {
      this.handletraitorOpenEyes();
    }
    else if (this.gameLoopState === this.traitorPickScreen) {
      this.handleTraitorPickScreen();
    }
    else if (this.gameLoopState === this.openEyes) {
      this.handleOpenEyes();
    }
    else if (this.gameLoopState === this.exitSelectScreen) {
      this.handleExitSelectScreen();
    }
  }

  exit() {
    this.grimoireCluesScreen = null;
    this.grimoireReveal = null;
    this.closeEyes = null;
    this.traitorReveal = null;
    this.traitorOpenEyes = null;
    this.openEyes = null;
    this.traitorPickScreen = null;
    this.exitSelectScreen = null;
    this.winScreen = null;
    this.loseScreen = null;
    this.loopStates = [];
    this.gameDoors = [];
    this.cohesionTokens = null;


    // Randomize the order of doors to be used
    this.exitDoor = null;
    this.clueDoors = [];
    this.gameLoopState = null;
  }




  handleGrimoireReveal() {
    this.grimoireReveal.draw();
    if (this.grimoireReveal.continueButton.released) {
      this.changeState(this.closeEyes);
    }
  }



  handleCloseEyes() {
    this.closeEyes.draw();
    if (this.closeEyes.continueButton.released) {
      if(this.game.playerCount > 3) {
        this.changeState(this.traitorReveal);
      }
      else {
        this.changeState(this.grimoireCluesScreen);
        this.grimoireCluesScreen.enter();
      }
    }
  }

  handleTraitorReveal() {
    this.traitorReveal.draw();
    if (this.traitorReveal.continueButton.released) {
      this.changeState(this.grimoireCluesScreen);
      this.grimoireCluesScreen.enter();
    }
  }

  handleGrimoireCluesScreen() {
    this.grimoireCluesScreen.update();
    this.grimoireCluesScreen.draw();
    if (this.grimoireCluesScreen.done) {
      if(this.game.playerCount > 3) {
        this.changeState(this.traitorOpenEyes);
      }
      else {
        this.changeState(this.openEyes);
      }
    }
  }

  handletraitorOpenEyes() {
    this.traitorOpenEyes.draw();
    if (this.traitorOpenEyes.continueButton.released) {
      this.changeState(this.traitorPickScreen);
      this.traitorPickScreen.enter();
    }
  }

  handleTraitorPickScreen() {
    this.traitorPickScreen.update();
    this.traitorPickScreen.draw();

    if (this.traitorPickScreen.nextButton.released) {
      this.changeState(this.openEyes);
      this.traitorPickScreen.exit();
    }
  }

  handleOpenEyes() {
    this.openEyes.draw();
    if (this.openEyes.continueButton.released) {
      this.changeState(this.exitSelectScreen);
      this.exitSelectScreen.enter();
    }
  }

  handleExitSelectScreen() {
    this.exitSelectScreen.update();
    if (this.exitSelectScreen.playerInd > this.game.playerCount) {
      this.exitSelectScreen.exit();
      if (this.level <= 6 && this.cohesionTokens > 0) {  // change to <= 6 levels and > 0 cohesion tokens
        this.handleNewLevel();
      }
      else if (this.level > 6) {
        gameState = gameStates.WIN_SCREEN;
        winScreen.enter();
        this.gameLoopState = this.grimoireReveal;
      }
      else if (this.cohesionTokens <= 0) {
        gameState = gameStates.LOSE_SCREEN;
        loseScreen.enter();
        this.gameLoopState = this.grimoireReveal;
      }
    }
    else {
      this.exitSelectScreen.draw();
    }
  }

  handleNewLevel() {
    this.grimoireCluesScreen = new GrimoireCluesScreen(this);
    this.exitSelectScreen = new ExitSelectScreen(this);
    this.exitDoor = new DoorObj(this, 200, 500, 2, 5, 200, 360, 1, this.gameDoors.pop());
    this.clueDoors = [];
    this.clueDoors.push(new DoorObj(this, -203, -45, 5, 3, 57, 108, 0, this.gameDoors.pop()));
    this.clueDoors.push(new DoorObj(this, 652, -30, 5, 2, 327, 106, 0, this.gameDoors.pop()));
    this.gameLoopState = this.grimoireReveal;
  }
}
