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
var num;
var titleImg;
var img0, img1, img2, img3, img4, img5, img6;

// Button Control
let button2players, button3players, button4players, button5players, button6players, button7players;
let buttonColor;

let cursorDefault, cursorPointer;

let menu, options, instuctions, playerNum, playerSel;
let gameState;
function preload() {
    titleImg = loadImage('assets/images/background.png');
    img0 = loadImage('assets/images/character0.png');
    img1 = loadImage('assets/images/character1.png');
    img2 = loadImage('assets/images/character2.png');
    img3 = loadImage('assets/images/character3.png');
    img4 = loadImage('assets/images/character4.png');
    img5 = loadImage('assets/images/character5.png');
    img6 = loadImage('assets/images/character6.png');
    cursorDefault = loadImage('assets/images/cursor_default.png');
    cursorPointer = loadImage('assets/images/cursor_pointer.png');
}
function setup() {
    createCanvas(600, 600);
    myGame = new GameObject();
    menu = new MainMenu(myGame);
    options = new OptionsMenu(myGame);
    instructions = new Instructions(myGame);
    playerNum = new PlayerNumberScreen(myGame);
    num = 0;
    for (let i = 0; i < 8; i++) {
        myGame.characters.push(new Character(i));
    }



    // Buttons for character select
    // TODO: Put this in the character select class
    buttonColor = color(0, 50, 200)


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
        fill(100, 100, 100, 150);
        noStroke();

        if (mouseX >= 85 && mouseX <= 185 && mouseY >= 65 && mouseY <= 205 && myGame.characters[0].characterTaken == false) {
            image(img0, 75, 50, 120, 170);
        }
        else {
            image(img0, 85, 65, 100, 140);
        }

        if (myGame.characters[0].characterTaken == true) {
            rect(85, 65, 100, 140);
        }
        if (mouseX >= 250 && mouseX <= 350 && mouseY >= 65 && mouseY <= 205 && myGame.characters[1].characterTaken == false) {
            image(img1, 240, 50, 120, 170);
        }
        else {
            image(img1, 250, 65, 100, 140);
        }

        if (myGame.characters[1].characterTaken == true) {
            rect(250, 65, 100, 140);
        }

        if (mouseX >= 415 && mouseX <= 515 && mouseY >= 65 && mouseY <= 205 && myGame.characters[2].characterTaken == false) {
            image(img2, 405, 50, 120, 170);
        }
        else {
            image(img2, 415, 65, 100, 140);
        }

        if (myGame.characters[2].characterTaken == true) {
            rect(415, 65, 100, 140);
        }

        if (mouseX >= 85 && mouseX <= 185 && mouseY >= 230 && mouseY <= 375 && myGame.characters[3].characterTaken == false) {
            image(img3, 75, 215, 120, 170);
        }
        else {
            image(img3, 85, 230, 100, 140);
        }

        if (myGame.characters[3].characterTaken == true) {
            rect(85, 230, 100, 140);
        }

        if (mouseX >= 250 && mouseX <= 350 && mouseY >= 230 && mouseY <= 375 && myGame.characters[4].characterTaken == false) {
            image(img4, 240, 215, 120, 170);
        }
        else {
            image(img4, 250, 230, 100, 140);
        }

        if (myGame.characters[4].characterTaken == true) {
            rect(250, 230, 100, 140);
        }

        if (mouseX >= 415 && mouseX <= 515 && mouseY >= 230 && mouseY <= 375 && myGame.characters[5].characterTaken == false) {
            image(img5, 405, 215, 120, 170);
        }
        else {
            image(img5, 415, 230, 100, 140);
        }

        if (myGame.characters[5].characterTaken == true) {
            rect(415, 230, 100, 140);
        }

        if (mouseX >= 250 && mouseX <= 350 && mouseY >= 395 && mouseY <= 535 && myGame.characters[6].characterTaken == false) {
            image(img6, 240, 380, 120, 170);
        }
        else {
            image(img6, 250, 395, 100, 140);
        }

        if (myGame.characters[6].characterTaken == true) {
            rect(250, 395, 100, 140);
        }
        fill(0);
        textSize(25);
        text(`Pick your character player ${num + 1}`, 150, 40);

        if (num == myGame.playerCount) {
            gameState = gameStates.GAME;
        }
    }
    else if (gameState === gameStates.OPTIONS_SCREEN) {
        options.updateOptionsMenu();
        options.drawOptionsMenu();

        if (options.backButton.released === true) {
            gameState = gameStates.MAIN_MENU;
            options.exit();
            menu.enter();
        }
    }
    else if (gameState === gameStates.INSTRUCTIONS) {
        instructions.updateInstructions();
        instructions.drawInstructions();

        if (instructions.backButton.released === true) {
            gameState = gameStates.MAIN_MENU;
            instructions.exit();
            menu.enter();
        }
    }

    // Do for every screen
    noCursor();
    image(cursorDefault, mouseX - 14, mouseY - 14);
}


function mouseClicked() {
    if (gameState === gameStates.PLAYER_SELECT) {
        if (mouseX >= 85 && mouseX <= 185 && mouseY >= 65 && mouseY <= 205 && myGame.characters[0].characterTaken == false) {
            myGame.players.push(new Player(num, 0));
            myGame.characters[0].characterTaken = true;
            num++;
        }
        else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 65 && mouseY <= 205 && myGame.characters[1].characterTaken == false) {
            myGame.players.push(new Player(num, 1));
            myGame.characters[1].characterTaken = true;
            num++;
        }
        else if (mouseX >= 415 && mouseX <= 515 && mouseY >= 65 && mouseY <= 205 && myGame.characters[2].characterTaken == false) {
            myGame.players.push(new Player(num, 2));
            myGame.characters[2].characterTaken = true;
            num++;
        }
        else if (mouseX >= 85 && mouseX <= 185 && mouseY >= 230 && mouseY <= 370 && myGame.characters[3].characterTaken == false) {
            myGame.players.push(new Player(num, 3));
            myGame.characters[3].characterTaken = true;
            num++;
        }
        else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 230 && mouseY <= 370 && myGame.characters[4].characterTaken == false) {
            myGame.players.push(new Player(num, 4));
            myGame.characters[4].characterTaken = true;
            num++;
        }
        else if (mouseX >= 415 && mouseX <= 515 && mouseY >= 230 && mouseY <= 370 && myGame.characters[5].characterTaken == false) {
            myGame.players.push(new Player(num, 5));
            myGame.characters[5].characterTaken = true;
            num++;
        }
        else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 395 && mouseY <= 535 && myGame.characters[6].characterTaken == false) {
            myGame.players.push(new Player(num, 6));
            myGame.characters[6].characterTaken = true;
            num++;
        }
    }
}

function handleMainMenu() {
    image(titleImg, 0, 0, 600, 600);
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