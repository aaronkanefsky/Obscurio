class charSelectScreen {
    constructor(num_players) {
        this.playerCount = num_players;
    }

    execute(me) {
        for (var i = 0; i < this.playerCount; i++) {

        }
    }
}

function mouseClicked() {
    if (myGame.currScreen == 0) {
        myGame.currScreen = 1;
    }
    else if (myGame.currScreen == 1) {
        if (mouseX >= 100 && mouseX <= 500) {
            // if (button2players.released) {
            //     myGame.playerCount = 2;
            //     myGame.currScreen = 2;
            // }
            if (mouseY >= 150 && mouseY <= 190) {
                myGame.playerCount = 3;
                myGame.currScreen = 2;
            }
            else if (mouseY >= 220 && mouseY <= 260) {
                myGame.playerCount = 4;
                myGame.currScreen = 2;
            }
            else if (mouseY >= 290 && mouseY <= 330) {
                myGame.playerCount = 5;
                myGame.currScreen = 2;
            }
            else if (mouseY >= 360 && mouseY <= 400) {
                myGame.playerCount = 6;
                myGame.currScreen = 2;
            }
            else if (mouseY >= 430 && mouseY <= 470) {
                myGame.playerCount = 7;
                myGame.currScreen = 2;
            }
            else if (mouseY >= 500 && mouseY <= 540) {
                myGame.playerCount = 8;
                myGame.currScreen = 2;
            }
        }
    }
    else if (myGame.currScreen == 2) {
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

var myGame;
var num;
var titleImg;
var img0, img1, img2, img3, img4, img5, img6;

// Button Control
let button2players, button3players, button4players, button5players, button6players, button7players;
let buttonColor;

let cursorDefault, cursorPointer;

let menu;
function preload(){
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
    num = 0;
    for (let i = 0; i < 8; i++) {
        myGame.characters.push(new Character(i));
    }
    


    // Buttons for character select
    buttonColor = color(0, 50, 200)
    button2players = new Button(300, 100, 400, 40, '2 Players', 25, 'Arial', buttonColor);
    button3players = new Button(300, 170, 400, 40, '3 Players', 25, 'Arial', buttonColor);
    button4players = new Button(300, 240, 400, 40, '4 Players', 25, 'Arial', buttonColor);
    button5players = new Button(300, 310, 400, 40, '5 Players', 25, 'Arial', buttonColor);
    button6players = new Button(300, 380, 400, 40, '6 Players', 25, 'Arial', buttonColor);
    button7players = new Button(300, 450, 400, 40, '7 Players', 25, 'Arial', buttonColor);
    button8players = new Button(300, 520, 400, 40, '8 Players', 25, 'Arial', buttonColor);
    menu.enter();
}

function draw() {
    background(220);
    if (myGame.currScreen == 0) {
        image(titleImg, 0, 0, 600, 600);
        menu.updateMainMenu();
        menu.drawMainMenu();
    }
    else if (myGame.currScreen == 1) {
        fill(0, 0, 255);

        fill(0);
        textSize(30);
        text('How many players?', 170, 50);

        button2players.updateButton();
        button3players.updateButton();
        button4players.updateButton();
        button5players.updateButton();
        button6players.updateButton();
        button7players.updateButton();
        button8players.updateButton();

        button2players.drawButton();
        button3players.drawButton();
        button4players.drawButton();
        button5players.drawButton();
        button6players.drawButton();
        button7players.drawButton();
        button8players.drawButton();

        if (button2players.released) {
            myGame.playerCount = 2;
            myGame.currScreen = 2;
        }

    }
    else if (myGame.currScreen == 2) {
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
            myGame.currScreen = 3;
        }
    }

    // Do for every screen
    noCursor();
    image(cursorDefault, mouseX - 14, mouseY - 14);
}
