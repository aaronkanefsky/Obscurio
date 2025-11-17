class Pathfinder {
  constructor(tilemap) {
    this.tilemap = tilemap;
    this.path = [];
    this.index = 0;
    this.speed = 2.5; // pixels per frame
  }

  setPath(path) {
    this.path = path || [];
    this.index = 0;
  }

  active() {
    return this.index < this.path.length;
  }

  // update moves the given player along the path (player must have .x and .y)
  update(player) {
    if (!this.active() || !player) return;

    // convert grid -> pixel center (same offsets used in your code)
    const TILE = 30;
    const OFFSET_X = 150;
    let step = this.path[this.index];
    let targetX = step.x * TILE + OFFSET_X + TILE / 2;
    let targetY = step.y * TILE + TILE / 2;

    let dx = targetX - player.x;
    let dy = targetY - player.y;
    let dist = Math.hypot(dx, dy);
    if(dy < 0) {
      player.direction = 0;   // faces upwards direction
    }
    else if(dx < 0) {
      player.direction = 1;   // faces left
    }
    else if(dy >= 0) {
      player.direction = 2;   // faces downward direction
    }
    else if(dx > 0) {
      player.direction = 3;   // faces right
    }

    if (dist <= this.speed) {
      // snap to tile center and advance
      player.x = targetX;
      player.y = targetY;
      this.index++;
    } else {
      player.x += (dx / dist) * this.speed;
      player.y += (dy / dist) * this.speed;
    }
  }
}

// A* using Manhattan heuristic and tile costs (half-walls cost more)
// start and goal are grid coords (integers)
function findAStarPath(sx, sy, tx, ty, tilemap) {
  const cols = tilemap[0].length;
  const rows = tilemap.length;

  // bounds check
  if (sx < 0 || sx >= cols || sy < 0 || sy >= rows) return [];
  if (tx < 0 || tx >= cols || ty < 0 || ty >= rows) return [];

  const tileCost = (c) => {
    if (c === 'w') return Infinity; // impassable
    if (c === 'l' || c === 'r' || c === 't' || c === 'b') return 3; // half-wall penalty
    return 1; // open
  };

  // If start or target is a full wall, no path
  if (tileCost(tilemap[sy][sx]) === Infinity || tileCost(tilemap[ty][tx]) === Infinity) {
    return [];
  }

  // open set as array of nodes {x,y,g,f}
  let open = [{ x: sx, y: sy, g: 0, f: Math.abs(tx - sx) + Math.abs(ty - sy) }];
  const came = {}; // key -> parentKey
  const gscore = {};
  gscore[`${sx},${sy}`] = 0;

  const neighbors = [[1,0],[-1,0],[0,1],[0,-1]];

  while (open.length > 0) {
    // pick lowest f
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();

    if (current.x === tx && current.y === ty) {
      // reconstruct path (start -> goal)
      const path = [];
      let key = `${tx},${ty}`;
      while (key) {
        const [kx, ky] = key.split(',').map(Number);
        path.unshift({ x: kx, y: ky });
        key = came[key];
      }
      return path;
    }

    for (let [dx, dy] of neighbors) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;

      const cost = tileCost(tilemap[ny][nx]);
      if (cost === Infinity) continue;

      const tentativeG = current.g + cost;
      const neighborKey = `${nx},${ny}`;

      if (gscore[neighborKey] == null || tentativeG < gscore[neighborKey]) {
        gscore[neighborKey] = tentativeG;
        came[neighborKey] = `${current.x},${current.y}`;
        const f = tentativeG + Math.abs(tx - nx) + Math.abs(ty - ny);
        // add or update open
        const existing = open.find(o => o.x === nx && o.y === ny);
        if (existing) {
          existing.g = tentativeG;
          existing.f = f;
        } else {
          open.push({ x: nx, y: ny, g: tentativeG, f });
        }
      }
    }
  }

  // no path found
  return [];
}