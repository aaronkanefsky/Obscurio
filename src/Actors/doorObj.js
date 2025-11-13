class doorObj {
  constructor(i,e,d) {
    this.index = i;
    this.count = 0;     // count of how many times this door has been picked this level
    this.exitCard = e;  // marker that this door is the exit for the current level
    this.door = d||null;      // image of door
    if (!d) console.warn("⚠️ doorObj created with no image!");
  }
}
