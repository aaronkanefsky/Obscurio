/**
 * Obscurio (Milestone 2)
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
    CREDITS_SCREEN: 2,
    PLAYER_NUM: 3,
    PLAYER_SELECT: 4,
    GAME: 5,
    WIN_SCREEN: 6,
    LOSE_SCREEN: 7
}

var globalGameConfig;

let instructionText;

// Cursor images
let cursorDefault, cursorPointer, showCursor;
var charWalk = [];
var charSpell = [];
let menu, credits, instructions, playerNum, playerSel, game, winScreen, loseScreen;
let gameState;
//var doorImgs = [];
var characters = [];

function preload() {
    cursorDefault = loadImage(ASSET_PATH + 'images/cursor_default.png');
    cursorButterfly = loadImage(ASSET_PATH + 'images/ButterflyMarker.png');
    for (var i = 0; i < 7; i++) {
        charWalk.push(loadImage(ASSET_PATH + "images/char" + i + "walk.png"));
        charSpell.push(loadImage(ASSET_PATH + "images/char" + i + "spellcast.png"));
    }

    // will change to include all 66 doors later
    /*for (i = 0; i < 28; i++) {
        doorImgs.push(loadImage(ASSET_PATH + "images/door" + i + ".png"));
    }*/

    instructionText = loadStrings(ASSET_PATH + 'instructions/Instructions.txt');
    creditsText = loadStrings(ASSET_PATH + 'credits/Credits.txt');
}

function setup() {
    createCanvas(600, 600);
    frameRate(40);

    globalGameConfig = new GameObject();

    menu = new MainMenu(globalGameConfig);
    credits = new CreditsMenu(globalGameConfig);
    instructions = new Instructions(globalGameConfig);
    playerNum = new PlayerNumberScreen(globalGameConfig);
    playerSel = new PlayerSelScreen(globalGameConfig);
    game = new GameLoopScreen(globalGameConfig);
    winScreen = new WinScreen(globalGameConfig);
    loseScreen = new LoseScreen(globalGameConfig);

    showCursor = true;

    gameState = gameStates.MAIN_MENU;
    menu.enter();
}


function draw() {
    background(220);

    switch (gameState) {
        case gameStates.MAIN_MENU:
            handleMainMenu();
            break;
        case gameStates.CREDITS_SCREEN:
            handleCreditsScreen();
            break;
        case gameStates.INSTRUCTIONS:
            handleInstructionsScreen();
            break;
        case gameStates.PLAYER_NUM:
            handlePlayerNumScreen();
            break;
        case gameStates.PLAYER_SELECT:
            handlePlayerSelScreen();
            break;
        case gameStates.GAME:
            handleGame();
            break;
        case gameStates.WIN_SCREEN:
            handleWinScreen();
            break;
        case gameStates.LOSE_SCREEN:
            handleLoseScreen();
            break;
        default:
            break;
    }

    // Do for every screen
    noCursor();
    showMouse();
}

function handleMainMenu() {
    menu.updateMainMenu();
    menu.drawMainMenu();
    if (menu.playButton.released === true) {
        gameState = gameStates.PLAYER_NUM;
        menu.exit();
        playerNum.enter();
    }
    else if (menu.creditsButton.released === true) {
        gameState = gameStates.CREDITS_SCREEN;
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
        globalGameConfig.playerCount = playerNum.playerNumSelection;
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
    if (playerSel.num === globalGameConfig.playerCount && playerSel.nextButton.released === true) {
        gameState = gameStates.GAME;
        playerSel.exit();
        game.enter();
    }

    else if (playerSel.backButton.released === true) {
        gameState = gameStates.PLAYER_NUM;
        playerSel.exit();
        playerNum.enter();
    }

}

function handleCreditsScreen() {
    credits.updateCreditsMenu();
    credits.drawCreditsMenu();

    if (credits.backButton.released === true) {
        gameState = gameStates.MAIN_MENU;
        credits.exit();
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

function handleGame() {
    if (game.level > 6) {    // Change to > 6 levels later
      game.exit();
    }
    else if (game.cohesionTokens <= 0) {
      game.exit();
    }
    game.draw();
}

function handleWinScreen() {
    winScreen.updateWinScreen();
    winScreen.drawWinScreen();

    if (winScreen.restartButton.released === true) {
        resetGame();
    }
}

function handleLoseScreen() {
    loseScreen.updateLoseScreen();
    loseScreen.drawLoseScreen();

    if (loseScreen.restartButton.released === true) {
        resetGame();
    }
}

function resetGame() {
    globalGameConfig = new GameObject();

    menu = new MainMenu(globalGameConfig);
    credits = new CreditsMenu(globalGameConfig);
    instructions = new Instructions(globalGameConfig);
    playerNum = new PlayerNumberScreen(globalGameConfig);
    playerSel = new PlayerSelScreen(globalGameConfig);
    game = new GameLoopScreen(globalGameConfig);
    winScreen = new WinScreen(globalGameConfig);
    loseScreen = new LoseScreen(globalGameConfig);

    gameState = gameStates.MAIN_MENU;
    menu.enter();
}



/////////////////////////////////
// Mouse Functions


function showMouse() {
    if (showCursor === true &&
        game.gameLoopState.state !== GrimoireState.PLACE_MARKERS ||
        (game.gameLoopState.state === GrimoireState.PLACE_MARKERS &&
            game.gameLoopState.butterflyMarker1.placed === true &&
            game.gameLoopState.butterflyMarker2.placed === true)
    ) {
        image(cursorDefault, mouseX - 14, mouseY - 14);
    }
}

// Mouse wheel events:
function mouseWheel(event) {
    // if mouse over box, let it handle the wheel and return false
    if (
        gameState === gameStates.INSTRUCTIONS &&
        (mouseX >= instructions.textbox.x &&
            mouseX <= instructions.textbox.x + instructions.textbox.w &&
            mouseY >= instructions.textbox.y &&
            mouseY <= instructions.textbox.y + instructions.textbox.h)
    ) {
        instructions.textbox.handleScroll(event);
        return false; // prevents page from scrolling in some browsers
    }
}

function mousePressed() {
    if (window._exitSelectScreenInstance) {
        window._exitSelectScreenInstance.handleMousePressed();
    }
}
