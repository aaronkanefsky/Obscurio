class fireworkObj {
  constructor(a) {
    this.position = new p5.Vector(300, 580);
    this.direction = new p5.Vector(0, 0);
    this.target = new p5.Vector(mouseX, mouseY);
    this.step = 0;
    this.explosions = [];
    for (var i = 0; i < 200; i++) {
      this.explosions.push(new explosionObj(a));
    }
  }

  draw() {
    fill(255, 255, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, 2, 2);
    this.position.add(this.direction);
    if (dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4) {
      this.step = 2;
      for (var i = 0; i < this.explosions.length; i++) {
        this.explosions[i].position.set(this.target.x, this.target.y);
        this.explosions[i].direction.set(random(0, 360), random(-0.8, 0.8));
        this.explosions[i].timer = 180;
      }
    }
  }
} // fireworkObj