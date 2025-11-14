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

var globalGameConfig;

let instructionText;

// Cursor images
let cursorDefault, cursorPointer, showCursor;
var charWalk = [];
var charSpell = [];
let menu, options, instuctions, playerNum, playerSel, game;
let gameState;
var doorImgs = [];
var characters = [];

function preload() {
    cursorDefault = loadImage(ASSET_PATH + 'images/cursor_default.png');
    cursorButterfly = loadImage(ASSET_PATH + 'images/ButterflyMarker.png');
    for (var i = 0; i < 7; i++) {
        charWalk.push(loadImage(ASSET_PATH + "images/char" + i + "walk.png"));
        charSpell.push(loadImage(ASSET_PATH + "images/char" + i + "spellcast.png"));
    }

    for (i = 5; i < 66; i++) {
        doorImgs.push(loadImage(ASSET_PATH + "images/door" + i + ".png"));
    }

    instructionText = loadStrings(ASSET_PATH + 'instructions/Instructions.txt');
}

function setup() {
    createCanvas(600, 600);
    frameRate(40);

    globalGameConfig = new GameObject();

    // Populate characters
    for (let i = 0; i < 7; i++) {
        let c = new Character(i);
        globalGameConfig.characters.push(c);  // <--- IMPORTANT
    }

    menu = new MainMenu(globalGameConfig);
    options = new OptionsMenu(globalGameConfig);
    instructions = new Instructions(globalGameConfig);
    playerNum = new PlayerNumberScreen(globalGameConfig);
    playerSel = new PlayerSelScreen(globalGameConfig);
    game = new GameLoopScreen(globalGameConfig, doorImgs);

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
        case gameStates.OPTIONS_SCREEN:
            handleOptionsScreen();
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

function handleGame() {
    game.draw();
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
