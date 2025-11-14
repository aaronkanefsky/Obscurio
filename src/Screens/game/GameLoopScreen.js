class GameLoopScreen {
  constructor(game) {
    this.game = game;
    this.gameDoors = [];
    this.exitDoor = null;
    this.clueDoors = [];
    this.level = 1;
    this.cohesionTokens = 0;
    this.loopStates = [
      this.grimoireCluesScreen = new GrimoireCluesScreen(this),
      this.grimoireReveal = new BufferScreen("Player 1\nYou are the Grimoire", this),
      this.traitorPickScreen = new TraitorPickScreen(this), 
      this.exitSelectScreen = new ExitSelectScreen(this)
    ];
    this.gameLoopState = this.grimoireReveal;
    this.levelDoors = [];
    this.doorArray = [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  }

  changeState(x) {
    this.gameLoopState = x;
  }
  
  enter() {
    this.cohesionTokens = (this.game.playerCount * 3) + (this.game.playerCount - 2);    // Formula derived from beginner level cohesion token allocation given in Obscurio instructions
    if(this.game.playerCount === 2) this.cohesionTokens += 6;                           // Adjustment for 2 players
    if(this.game.playerCount === 3) this.cohesionTokens -= 1;                           // Adjustment for 3 players
    

    // Randomize the order of doors to be used
    this.doorArray = shuffle(this.doorArray);
    this.exitDoor = new DoorObj(200, 500, 2, 5, 200, 360, this.doorArray.pop(), null, 1);
    this.clueDoors.push(new DoorObj(-203, -45, 5, 3, 57, 108, this.doorArray.pop(), null, 0))
    this.clueDoors.push(new DoorObj(652, -30, 5, 2, 327, 106, this.doorArray.pop(), null, 0))
    
    // this.levelDoors.push(new DoorObj(true,this.exit));

    // TODO: Remove this. Debug only
    this.grimoireCluesScreen.enter();
  }

  draw() {
    background(220);
    if(this.gameLoopState === this.grimoireReveal){
      this.handleGrimoireReveal();
    }
    else if(this.gameLoopState === this.grimoireCluesScreen) {
      this.handleGrimoireCluesScreen();
    }
    else if(this.gameLoopState === this.closeEyes){
      background(0,255,0);
    }
    else if(this.gameLoopState === this.traitorReveal){
      
    }
    else if(this.gameLoopState === this.sabotage){
      
    }
    else if(this.gameLoopState === this.traitorPickScreen) {
      this.handleTraitorPickScreen();
    }
    else if(this.gameLoopState === this.openEyes){
      
    }
    else {
      handleExitSelectScreen();
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

  

  handleGrimoireReveal(){
    this.grimoireReveal.draw();
    if(this.grimoireReveal.continueButton.released)
      this.changeState(this.grimoireCluesScreen);
  }

  handleGrimoireCluesScreen() {
    this.grimoireCluesScreen.update();
    this.grimoireCluesScreen.draw();
    if(this.grimoireCluesScreen.done){
      this.changeState(this.closeEyes);
    }
  }

  handleCloseEyes(){

  }

  handleTraitorReveal(){

  }

  handleSabotage(){

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

  handleOpenEyes(){

  }

  handleExitSelectScreen() {
    this.exitSelectScreen.update();
    this.exitSelectScreen.draw();

    if(this.exitSelectScreen.nextButton.released === true) {
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
    }
  }
}
