/**
 * Obscurio (Milestone 1)
 * 
 * 
 * Created by L'Atelier
 * Original Game Art made by Xavier Collette
 * 
 * Recreated in p5js by Emma Wallace and Aaron Kanefsky
 * 
 * Breakdown of work:
 * Emma Wallace:
 * - Main behavior of game
 * - Sourcing artwork from the game
 * - Generate and create player animations
 * 
 * Aaron Kanefsky:
 * - Refactoring of code to be an FSM
 * - Design of button objects
 * - Design of state architecture
 * - Blurred background image
 */


const gameStates = {
    MAIN_MENU: 0,
    INSTRUCTIONS: 1,
    OPTIONS_SCREEN: 2,
    PLAYER_NUM: 3,
    PLAYER_SELECT: 4,
    GAME: 5,
}

var myGame;

let instructionText;

// Cursor images
let cursorDefault, cursorPointer;
var charWalk = [];
var charSpell = [];
let menu, options, instuctions, playerNum, playerSel;
let gameState;
function preload() {
    cursorDefault = loadImage(ASSET_PATH + 'images/cursor_default.png');
    cursorPointer = loadImage(ASSET_PATH + 'images/cursor_pointer.png');
    for(var i = 0; i < 7; i++) {
        charWalk.push(loadImage(ASSET_PATH + "images/char" + i + "walk.png"));
        charSpell.push(loadImage(ASSET_PATH + "images/char" + i + "spellcast.png"));
    }

    instructionText = loadStrings(ASSET_PATH + 'instructions/Instructions.txt');
}
function setup() {
    createCanvas(600, 600);
    myGame = new GameObject();
    menu = new MainMenu(myGame);
    options = new OptionsMenu(myGame);
    instructions = new Instructions(myGame);
    playerNum = new PlayerNumberScreen(myGame);
    playerSel = new PlayerSelScreen(myGame);
    for (let i = 0; i < 8; i++) {
        myGame.characters.push(new Character(i, 100, 100));
    }

    gameState = gameStates.MAIN_MENU;
    menu.enter();
}

function draw() {
    background(220);
    if (gameState === gameStates.MAIN_MENU) {
        handleMainMenu();
    }
    else if (gameState === gameStates.PLAYER_NUM) {
        handlePlayerNumScreen();
    }
    else if (gameState === gameStates.PLAYER_SELECT) {
        handlePlayerSelScreen();
    }
    else if (gameState === gameStates.OPTIONS_SCREEN) {
        handleOptionsScreen();
    }
    else if (gameState === gameStates.INSTRUCTIONS) {
        handleInstructionsScreen();
    }

    // Do for every screen
    noCursor();
    image(cursorDefault, mouseX - 14, mouseY - 14);
}

function handleMainMenu() {
    menu.updateMainMenu();
    menu.drawMainMenu();
    if (menu.playButton.released === true) {
        gameState = gameStates.PLAYER_NUM;
        menu.exit();
        playerNum.enter();
    }
    else if (menu.optionsButton.released === true) {
        gameState = gameStates.OPTIONS_SCREEN;
        menu.exit();
        options.enter();
    }
    else if (menu.instructionsButton.released === true) {
        gameState = gameStates.INSTRUCTIONS;
        menu.exit();
        instructions.enter();
    }
}

function handlePlayerNumScreen() {
    playerNum.updatePlayerNumberScreen();
    playerNum.drawPlayerNumberScreen();
    if (playerNum.playerNumSelection > 0) {
        myGame.playerCount = playerNum.playerNumSelection;
        gameState = gameStates.PLAYER_SELECT;
        playerNum.exit();
        playerSel.enter();
    }
    else if (playerNum.backButton.released === true) {
        gameState = gameStates.MAIN_MENU;
        playerNum.exit();
        menu.enter();
    }
}

function handlePlayerSelScreen() {
    playerSel.updatePlayerSelScreen();
    playerSel.drawPlayerSelScreen();

    // Change to the game
    if (playerSel.num === myGame.playerCount && playerSel.nextButton.released === true) {
        gameState = gameStates.GAME;
        playerSel.exit();
    }
    
    else if (playerSel.backButton.released === true) {
        gameState = gameStates.PLAYER_NUM;
        playerSel.exit();
        playerNum.enter();
    }

}

function handleOptionsScreen() {
    options.updateOptionsMenu();
    options.drawOptionsMenu();

    if (options.backButton.released === true) {
        gameState = gameStates.MAIN_MENU;
        options.exit();
        menu.enter();
    }
}

function handleInstructionsScreen() {
    instructions.updateInstructions();
    instructions.drawInstructions();

    if (instructions.backButton.released === true) {
        gameState = gameStates.MAIN_MENU;
        instructions.exit();
        menu.enter();
    }
}



// Mouse wheel events:
function mouseWheel(event) {
  // if mouse over box, let it handle the wheel and return false
  if (
    mouseX >= instructions.textbox.x &&
    mouseX <= instructions.textbox.x + instructions.textbox.w &&
    mouseY >= instructions.textbox.y &&
    mouseY <= instructions.textbox.y + instructions.textbox.h
  ) {
    instructions.textbox.handleScroll(event);
    return false; // prevents page from scrolling in some browsers
  }
}
