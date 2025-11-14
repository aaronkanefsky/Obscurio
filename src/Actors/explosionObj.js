class explosionObj {
  constructor(a) {
    this.position = new p5.Vector(0, 0);
    this.direction = new p5.Vector(0, 0);
    this.size = random(3,5);
    if (a === 0) {
      this.c1 = random(0, 250);
    }
    else {
      this.c1 = random(100, 255);
    }

    if (a === 1) {
      this.c2 = random(0, 250);
    }
    else {
      this.c2 = random(100, 255);
    }

    if (a === 3) {
      this.c3 = random(0, 250);
    }
    else {
      this.c3 = random(100, 255);
    }
    this.timer = 0;
  }
  //// EXPERIMENT direction of explosion /////
  draw() {
    fill(this.c1, this.c2, this.c3, this.timer); // 4th value fader
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
    this.position.x += this.direction.y*cos(this.direction.x);
    this.position.y += this.direction.y*sin(this.direction.x);
    this.position.y += (90/(this.timer + 100)); //gravity
    this.timer--;
  }
}