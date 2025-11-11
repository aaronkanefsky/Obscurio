
class charSelectScreen {
  constructor(num_players) {
    this.playerCount = num_players;
  }
  
  execute(me) {
    for(var i = 0; i < this.playerCount; i++) {
      
    }
  }
}

function mouseClicked() {
  if(myGame.currScreen == 0) {
    myGame.currScreen = 1;
  }
  else if(myGame.currScreen == 1) {
    if(mouseX >= 100 && mouseX <= 500) {
      if(mouseY >= 80 && mouseY <= 120) {
        myGame.playerCount = 2;
        myGame.currScreen = 2;
      }
      else if(mouseY >= 150 && mouseY <= 190) {
        myGame.playerCount = 3;
        myGame.currScreen = 2;
      }
      else if(mouseY >= 220 && mouseY <= 260) {
        myGame.playerCount = 4;
        myGame.currScreen = 2;
      }
      else if(mouseY >= 290 && mouseY <= 330) {
        myGame.playerCount = 5;
        myGame.currScreen = 2;
      }
      else if(mouseY >= 360 && mouseY <= 400) {
        myGame.playerCount = 6;
        myGame.currScreen = 2;
      }
      else if(mouseY >= 430 && mouseY <= 470) {
        myGame.playerCount = 7;
        myGame.currScreen = 2;
      }
      else if(mouseY >= 500 && mouseY <= 540) {
        myGame.playerCount = 8;
        myGame.currScreen = 2;
      }
    }
  }
  else if(myGame.currScreen == 2) {
    if(mouseX >= 85 && mouseX <= 185 && mouseY >= 65 && mouseY <= 205 && myGame.characters[0].characterTaken == false) {
      myGame.players.push(new Player(num, 0));
      myGame.characters[0].characterTaken = true;
      num++;
    }
    else if(mouseX >= 250 && mouseX <= 350 && mouseY >= 65 && mouseY <= 205 && myGame.characters[1].characterTaken == false) {
      myGame.players.push(new Player(num, 1));
      myGame.characters[1].characterTaken = true;
      num++;
    }
    else if(mouseX >= 415 && mouseX <= 515 && mouseY >= 65 && mouseY <= 205 && myGame.characters[2].characterTaken == false) {
      myGame.players.push(new Player(num, 2));
      myGame.characters[2].characterTaken = true;
      num++;
    }
    else if(mouseX >= 85 && mouseX <= 185 && mouseY >= 230 && mouseY <= 370 && myGame.characters[3].characterTaken == false) {
      myGame.players.push(new Player(num, 3));
      myGame.characters[3].characterTaken = true;
      num++;
    }
    else if(mouseX >= 250 && mouseX <= 350 && mouseY >= 230 && mouseY <= 370 && myGame.characters[4].characterTaken == false) {
      myGame.players.push(new Player(num, 4));
      myGame.characters[4].characterTaken = true;
      num++;
    }
    else if(mouseX >= 415 && mouseX <= 515 && mouseY >= 230 && mouseY <= 370 && myGame.characters[5].characterTaken == false) {
      myGame.players.push(new Player(num, 5));
      myGame.characters[5].characterTaken = true;
      num++;
    }
    else if(mouseX >= 250 && mouseX <= 350 && mouseY >= 395 && mouseY <= 535 && myGame.characters[6].characterTaken == false) {
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

function setup() {
  createCanvas(600, 600);
  myGame = new gameObj();
  num = 0;
  for(i = 0; i < 8; i++) {
    myGame.characters.push(new Character(i));
  }
  titleImg = loadImage(ASSET_PATH + 'images/title_screen.png');
  img0 = loadImage(ASSET_PATH + 'images/character0.png');
  img1 = loadImage(ASSET_PATH + 'images/character1.png');
  img2 = loadImage(ASSET_PATH + 'images/character2.png');
  img3 = loadImage(ASSET_PATH + 'images/character3.png');
  img4 = loadImage(ASSET_PATH + 'images/character4.png');
  img5 = loadImage(ASSET_PATH + 'images/character5.png');
  img6 = loadImage(ASSET_PATH + 'images/character6.png');
}

function draw() {
  background(220);
  if(myGame.currScreen == 0) {
    image(titleImg,0,0,600,600);
  }
  else if(myGame.currScreen == 1) {
    fill(0,0,255);
    rect(100,80,400,40);
    rect(100,150,400,40);
    rect(100,220,400,40);
    rect(100,290,400,40);
    rect(100,360,400,40);
    rect(100,430,400,40);
    rect(100,500,400,40);
    fill(0);
    textSize(30);
    text("How many players?",170,50);
    fill(255);
    textSize(25);
    text('2 Players',240,110);
    text('3 Players',240,180);
    text('4 Players',240,250);
    text('5 Players',240,320);
    text('6 Players',240,390);
    text('7 Players',240,460);
    text('8 Players',240,530);
  }
  else if(myGame.currScreen == 2) {
    fill(100,100,100,150);
    noStroke();
    
    if(mouseX >= 85 && mouseX <= 185 && mouseY >= 65 && mouseY <= 205 && myGame.characters[0].characterTaken == false) {
      image(img0,75,50,120,170);
    }
    else {
      image(img0,85,65,100,140);
    }
    
    if(myGame.characters[0].characterTaken == true) {
      rect(85,65,100,140);
    }
    
    if(mouseX >= 250 && mouseX <= 350 && mouseY >= 65 && mouseY <= 205 && myGame.characters[1].characterTaken == false) {
      image(img1,240,50,120,170);
    }
    else {
      image(img1,250,65,100,140);
    }
    
    if(myGame.characters[1].characterTaken == true) {
      rect(250,65,100,140);
    }
    
    if(mouseX >= 415 && mouseX <= 515 && mouseY >= 65 && mouseY <= 205 && myGame.characters[2].characterTaken == false) {
      image(img2,405,50,120,170);
    }
    else {
      image(img2,415,65,100,140);
    }
    
    if(myGame.characters[2].characterTaken == true) {
      rect(415,65,100,140);
    }
    
    if(mouseX >= 85 && mouseX <= 185 && mouseY >= 230 && mouseY <= 375 && myGame.characters[3].characterTaken == false) {
      image(img3,75,215,120,170);
    }
    else {
      image(img3,85,230,100,140);
    }
    
    if(myGame.characters[3].characterTaken == true) {
      rect(85,230,100,140);
    }
    
    if(mouseX >= 250 && mouseX <= 350 && mouseY >= 230 && mouseY <= 375 && myGame.characters[4].characterTaken == false) {
      image(img4,240,215,120,170);
    }
    else {
      image(img4,250,230,100,140);
    }
    
    if(myGame.characters[4].characterTaken == true) {
      rect(250,230,100,140);
    }
    
    if(mouseX >= 415 && mouseX <= 515 && mouseY >= 230 && mouseY <= 375 && myGame.characters[5].characterTaken == false) {
      image(img5,405,215,120,170);
    }
    else {
      image(img5,415,230,100,140);
    }
    
    if(myGame.characters[5].characterTaken == true) {
      rect(415,230,100,140);
    }
    
    if(mouseX >= 250 && mouseX <= 350 && mouseY >= 395 && mouseY <= 535 && myGame.characters[6].characterTaken == false) {
      image(img6,240,380,120,170);
    }
    else {
      image(img6,250,395,100,140);
    }
    
    if(myGame.characters[6].characterTaken == true) {
      rect(250,395,100,140);
    }
    fill(0);
    textSize(25);
    text(`Pick your character player ${num + 1}`, 150, 40); 
    
    if(num == myGame.playerCount) {
      myGame.currScreen = 3;
    }
  }
}
