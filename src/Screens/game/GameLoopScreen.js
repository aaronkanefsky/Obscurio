class GameLoopScreen {
  constructor(game, doorImgs) {
    this.game = game;
    this.doorImgs = doorImgs;
    this.gameDoors = [];
    this.exitDoor = null;
    this.clueDoors = [];
    this.level = 1;
    this.cohesionTokens = 0;
    this.loopStates = [
      this.grimoireCluesScreen = new GrimoireCluesScreen(this),
      this.grimoireReveal = new BufferScreen("Player 1\nYou are the Grimoire", this),
      this.closeEyes = new BufferScreen("All other players close your eyes", this),
      this.traitorReveal = new BufferScreen("Player " + floor(random(2, this.game.playerCount + 1)) + " is the Traitor. Silently indicate to them that they are the traitor!", this),
      this.traitorOpenEyes = new BufferScreen("Grimoire, instruct the traitor to open their eyes. Press 'continue' once they have done so.", this),
      this.openEyes = new BufferScreen("All players open your eyes", this),
      this.traitorPickScreen = new TraitorPickScreen(this),
      this.exitSelectScreen = new ExitSelectScreen(this)
    ];
    this.characters = [];
    this.gameLoopState = this.grimoireReveal;
    this.levelDoors = [];
    /*this.doorArray = [];
    for(let i = 0; i < 25; i++) {
      this.doorArray.push(i);
    }*/
  }

  changeState(x) {
    this.gameLoopState = x;
  }

  enter() {

    for (let i = 0; i < 7; i++) {
      let c = new Character(i);
      characters.push(c);           // optional global array
      game.characters.push(c);      // safe now
    }

    this.gameDoors = shuffle(this.doorImgs);
    this.cohesionTokens = (this.game.playerCount * 3) + (this.game.playerCount - 2);    // Formula derived from beginner level cohesion token allocation given in Obscurio instructions
    if (this.game.playerCount === 2) this.cohesionTokens += 6;                           // Adjustment for 2 players
    if (this.game.playerCount === 3) this.cohesionTokens -= 1;                           // Adjustment for 3 players


    // Randomize the order of doors to be used
    //this.doorArray = shuffle(this.doorArray);
    this.exitDoor = new DoorObj(200, 500, 2, 5, 200, 360, 1, this.gameDoors.pop());
    this.clueDoors.push(new DoorObj(-203, -45, 5, 3, 57, 108, 0, this.gameDoors.pop()))
    this.clueDoors.push(new DoorObj(652, -30, 5, 2, 327, 106, 0, this.gameDoors.pop()))
    //this.gameDoors = this.doorArray;

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



  handleGrimoireReveal() {
    this.grimoireReveal.draw();
    if (this.grimoireReveal.continueButton.released)
      this.changeState(this.closeEyes);
  }



  handleCloseEyes() {
    this.closeEyes.draw();
    if (this.closeEyes.continueButton.released)
      this.changeState(this.traitorReveal);
  }

  handleTraitorReveal() {
    this.traitorReveal.draw();
    if (this.traitorReveal.continueButton.released) {
      this.changeState(this.grimoireCluesScreen);
      this.grimoireCluesScreen.enter();
    }
  }

  handleGrimoireCluesScreen() {
    // TODO: Remove this. Debug only

    this.grimoireCluesScreen.update();
    this.grimoireCluesScreen.draw();
    if (this.grimoireCluesScreen.done) {
      this.changeState(this.openEyes);
    }
  }
  handletraitorOpenEyes() {

    this.traitorOpenEyes.draw();
    if (this.traitorOpenEyes.continueButton.released) {
      this.changeState(this.traitorPickScreen);
      // this.traitorPickScreen.enter();
    }
  }

  handleTraitorPickScreen() {
    // this.traitorPickScreen.update();
    // this.traitorPickScreen.draw();

    // if (this.traitorPickScreen.nextButton.released === true) {
    //   this.gameLoopState.changeState(this.exitSelectScreen);
    //   this.traitorPickScreen.exit();
    //   this.exitSelectScreen.enter();

    background(0, 0, 255)

      ;
  }

  handleOpenEyes() {
    this.openEyes.draw();
    if (this.openEyes.continueButton.released) {
      this.changeState(this.exitSelectScreen);
      this.exitSelectScreen.enter();
    }
  }

  handleExitSelectScreen() {
    if(this.exitSelectScreen.playerInd > this.game.playerCount) {
      if(this.level <= 1 && this.cohesionTokens > 8) {  // change to <= 6 levels and > 0 cohesion tokens
        this.changeState(this.grimoireCluesScreen);
        this.exitSelectScreen.exit();
        this.grimoireCluesScreen.enter();
      }
    }
    else {
      this.exitSelectScreen.update();
      this.exitSelectScreen.draw();
    }
  }
}
