class GameLoopScreen {
  constructor(game) {
    this.game = game;
    this.gameDoors = [];
    this.exitDoor = null;
    this.clueDoors = [];
    this.level = 1;
    this.cohesionTokens = 0;
    // this.game.playerCount = 9; // TODO: THIS IS DEBUG. REMOVE THIS
    this.loopStates = [
      this.grimoireCluesScreen = new GrimoireCluesScreen(this),
      this.grimoireReveal = new BufferScreen("Player 1\nYou are the Grimoire", this),
      this.closeEyes = new BufferScreen("All other players close your eyes", this),
      this.traitorReveal = new BufferScreen("Player " + floor(random(2,this.game.playerCount+1)) + " is the Traitor. Silently indicate to them that they are the traitor!", this),
      this.traitorOpenEyes = new BufferScreen("Grimoire, instruct the traitor to open their eyes. Press 'continue' once they have done so.", this),
      this.traitorPickScreen = new TraitorPickScreen(this),
      this.exitSelectScreen = new ExitSelectScreen(this)
    ];

    // TODO: FOR TESTING ONLY
    this.gameLoopState = this.traitorPickScreen;
    this.traitorPickScreen.enter();
    // this.gameLoopState = this.grimoireReveal;
    this.levelDoors = [];
    this.doorArray = [];
    for(let i = 0; i < 66; i++){
      this.doorArray.push(i);
    }
  }

  changeState(x) {
    this.gameLoopState = x;
  }

  enter() {
    this.cohesionTokens = (this.game.playerCount * 3) + (this.game.playerCount - 2);    // Formula derived from beginner level cohesion token allocation given in Obscurio instructions
    if (this.game.playerCount === 2) this.cohesionTokens += 6;                           // Adjustment for 2 players
    if (this.game.playerCount === 3) this.cohesionTokens -= 1;                           // Adjustment for 3 players


    // Randomize the order of doors to be used
    this.doorArray = shuffle(this.doorArray);
    this.exitDoor = new DoorObj(200, 500, 2, 5, 200, 360, this.doorArray.pop(), null, 1);
    this.clueDoors.push(new DoorObj(-203, -45, 5, 3, 57, 108, this.doorArray.pop(), null, 0));
    this.clueDoors.push(new DoorObj(652, -30, 5, 2, 327, 106, this.doorArray.pop(), null, 0));
    // Add 8 doors to the folio
    for(let i = 0; i < 8; i++){
      if(i < 4)
        this.traitorPickScreen.folioDoors.push(new FolioObj(70 + (150*i), 280, this.doorArray.pop()))
      else
        this.traitorPickScreen.folioDoors.push(new FolioObj(70 + (150*(i-4)), 450,this.doorArray.pop()))
    }

    this.gameDoors = this.doorArray;
    
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
    if (this.traitorReveal.continueButton.released){
      this.changeState(this.grimoireCluesScreen);
      this.grimoireCluesScreen.enter();
    }
  }

  handleGrimoireCluesScreen() {
    // TODO: Remove this. Debug only
    
    this.grimoireCluesScreen.update();
    this.grimoireCluesScreen.draw();
    if (this.grimoireCluesScreen.done) {
      this.changeState(this.traitorOpenEyes);
    }
  }
  handletraitorOpenEyes(){

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
    this.traitorPickScreen.update();
    this.traitorPickScreen.draw()
    
;  }

  handleOpenEyes() {

  }

  handleExitSelectScreen() {
    this.exitSelectScreen.update();
    this.exitSelectScreen.draw();

    if (this.exitSelectScreen.nextButton.released === true) {
      this.gameLoopState.changeState(this.grimoireCluesScreen);
      this.exitSelectScreen.exit();
      if (this.level > 6) {
        this.game.gameState = this.game.gameStates.WIN_SCREEN;
        this.exit();
        this.game.winScreen.enter();
      }
      else if (this.cohesionTokens <= 0) {
        this.game.gameState = this.game.gameStates.LOSE_SCREEN;
        this.exit();
        this.game.loseScreen.enter();
      }
      else {
        this.grimoireCluesScreen.enter();
      }
    }
  }
}
