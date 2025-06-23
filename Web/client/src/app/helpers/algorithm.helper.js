export async function runDFS(matrix, start, goal, onVisit, delay = 10) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const stack = [start];

  while (stack.length) {
    const [r, c] = stack.pop();

    if (
      r < 0 || r >= rows ||
      c < 0 || c >= cols ||
      visited[r][c] ||
      matrix[r][c] === 1
    ) continue;

    visited[r][c] = true;
    onVisit(r, c);
    await sleep(delay);

    // Tìm thấy đích
    if (r === goal[0] && c === goal[1]) {
      let path = [];
      let cur = [r, c];
      while (cur) {
        path.push(cur);
        cur = parent[cur[0]][cur[1]];
      }
      path.reverse();
      return path;
    }

    const neighbors = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ];

    for (const [nr, nc] of neighbors) {
      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        !visited[nr][nc] &&
        matrix[nr][nc] !== 1 &&
        parent[nr][nc] === null
      ) {
        parent[nr][nc] = [r, c];
        stack.push([nr, nc]);
      }
    }
  }

  return null;
}

export async function runBFS(matrix, start, goal, onVisit, delay = 10) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const queue = [start];
  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    onVisit(r, c);
    await sleep(delay);

    // Tìm thấy đích
    if (r === goal[0] && c === goal[1]) {
      let path = [];
      let cur = [r, c];
      while (cur) {
        path.push(cur);
        cur = parent[cur[0]][cur[1]];
      }
      path.reverse();

      return path;
    }

    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
    ];

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        !visited[nr][nc] &&
        matrix[nr][nc] !== 1
      ) {
        visited[nr][nc] = true;
        parent[nr][nc] = [r, c];
        queue.push([nr, nc]);
      }
    }
  }

  return null;
}

export async function runIDDFS(matrix, start, goal, onVisit, delay = 5, maxDepth = 650) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  function heuristic([x, y], [gx, gy]) {
    return Math.abs(x - gx) + Math.abs(y - gy);
  }

  function isValid(r, c, visited) {
    return (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      !visited[r][c] &&
      matrix[r][c] !== 1
    );
  }

  async function dls(r, c, depth, visited, parent, visitCounter) {
    if (depth < 0 || !isValid(r, c, visited)) return null;

    visited[r][c] = true;
    if (++visitCounter.count % 10 === 0) {
      onVisit?.(r, c);
      await sleep(delay);
    }

    if (r === goal[0] && c === goal[1]) {
      let path = [];
      let cur = [r, c];
      while (cur) {
        path.push(cur);
        cur = parent[cur[0]][cur[1]];
      }
      return path.reverse();
    }

    let directions = [
      [1, 0], [-1, 0],
      [0, 1], [0, -1],
    ];

    directions.sort((a, b) => {
      const ha = heuristic([r + a[0], c + a[1]], goal);
      const hb = heuristic([r + b[0], c + b[1]], goal);
      return ha - hb;
    });

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (isValid(nr, nc, visited)) {
        parent[nr][nc] = [r, c];
        const result = await dls(nr, nc, depth - 1, visited, parent, visitCounter);
        if (result) return result;
      }
    }

    visited[r][c] = false; 
    return null;
  }

  const estimatedDepth = heuristic(start, goal) + 10;
  const limit = Math.min(estimatedDepth, maxDepth);

  for (let depth = 1; depth <= maxDepth; depth += 2) {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
    const visitCounter = { count: 0 };

    const result = await dls(start[0], start[1], depth, visited, parent, visitCounter);
    if (result) return result;
  }

  return null;
}


export async function runAStar(matrix, start, goal, onVisit, delay = 10) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  function heuristic(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }

  function isValid(r, c) {
    return (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      matrix[r][c] !== 1
    );
  }

  const openSet = new Set(); //chua r, c 
  const cameFrom = Array.from({ length: rows }, () => Array(cols).fill(null));
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

  const toKey = (r, c) => `${r},${c}`;
  const fromKey = (key) => key.split(',').map(Number);

  const [sr, sc] = start;
  const [gr, gc] = goal;

  gScore[sr][sc] = 0;
  fScore[sr][sc] = heuristic(start, goal);

  const pq = [[fScore[sr][sc], start]];
  openSet.add(toKey(sr, sc));

  while (pq.length > 0) {
    // Sắp xếp hàng đợi theo fScore
    pq.sort((a, b) => a[0] - b[0]);
    const [_, [r, c]] = pq.shift();
    openSet.delete(toKey(r, c));

    onVisit(r, c);
    await sleep(delay);

    if (r === gr && c === gc) {
      let path = [];
      let cur = [r, c];
      while (cur) {
        path.push(cur);
        cur = cameFrom[cur[0]][cur[1]];
      }
      return path.reverse();
    }

    const directions = [
      [1, 0], [-1, 0],
      [0, 1], [0, -1],
    ];

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (!isValid(nr, nc)) continue;

      const tentativeG = gScore[r][c] + 1;

      if (tentativeG < gScore[nr][nc]) {
        cameFrom[nr][nc] = [r, c];
        gScore[nr][nc] = tentativeG;
        fScore[nr][nc] = tentativeG + heuristic([nr, nc], goal);

        const key = toKey(nr, nc);
        if (!openSet.has(key)) {
          openSet.add(key);
          pq.push([fScore[nr][nc], [nr, nc]]);
        }
      }
    }
  }

  return null; // Không tìm thấy đường đi
}

export async function runUCS(matrix, start, goal, onVisit, delay = 10) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  function isValid(r, c) {
    return (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      matrix[r][c] !== 1
    );
  }

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const cost = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

  const [sr, sc] = start;
  const [gr, gc] = goal;

  const pq = [[0, [sr, sc]]]; // [cost, position]
  cost[sr][sc] = 0;

  while (pq.length > 0) {
    // Sort để lấy ô có cost nhỏ nhất
    pq.sort((a, b) => a[0] - b[0]);
    const [currentCost, [r, c]] = pq.shift();

    if (visited[r][c]) continue;
    visited[r][c] = true;

    onVisit(r, c);
    await sleep(delay);

    // Đã đến đích
    if (r === gr && c === gc) {
      let path = [];
      let cur = [r, c];
      while (cur) {
        path.push(cur);
        cur = parent[cur[0]][cur[1]];
      }
      return path.reverse();
    }

    const directions = [
      [1, 0], [-1, 0],
      [0, 1], [0, -1],
    ];

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (!isValid(nr, nc) || visited[nr][nc]) continue;

      const newCost = currentCost + 1; // Tất cả chi phí = 1
      if (newCost < cost[nr][nc]) {
        cost[nr][nc] = newCost;
        parent[nr][nc] = [r, c];
        pq.push([newCost, [nr, nc]]);
      }
    }
  }

  return null; // Không tìm thấy đường đi
}

export async function runBi_Directional_Search(matrix, start, goal, onVisit, delay = 10) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  function isValid(r, c) {
    return (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      matrix[r][c] !== 1
    );
  }

  const visitedStart = Array.from({ length: rows }, () => Array(cols).fill(false));
  const visitedGoal = Array.from({ length: rows }, () => Array(cols).fill(false));

  const parentStart = Array.from({ length: rows }, () => Array(cols).fill(null));
  const parentGoal = Array.from({ length: rows }, () => Array(cols).fill(null));

  const queueStart = [start];
  const queueGoal = [goal];

  visitedStart[start[0]][start[1]] = true;
  visitedGoal[goal[0]][goal[1]] = true;

  while (queueStart.length && queueGoal.length) {
    const process = async (queue, visitedThisSide, visitedOtherSide, parentThisSide, label) => {
      const [r, c] = queue.shift();
      onVisit(r, c);
      await sleep(delay);

      const directions = [
        [1, 0], [-1, 0],
        [0, 1], [0, -1],
      ];

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (!isValid(nr, nc)) continue;

        if (!visitedThisSide[nr][nc]) {
          visitedThisSide[nr][nc] = true;
          parentThisSide[nr][nc] = [r, c];
          queue.push([nr, nc]);

          // Nếu đã bị bên kia duyệt → tìm thấy giao điểm
          if (visitedOtherSide[nr][nc]) {
            return [nr, nc]; // điểm gặp nhau
          }
        }
      }

      return null;
    };

    const meet1 = await process(queueStart, visitedStart, visitedGoal, parentStart, 'start');
    if (meet1) return reconstructBidirectionalPath(meet1, parentStart, parentGoal);

    const meet2 = await process(queueGoal, visitedGoal, visitedStart, parentGoal, 'goal');
    if (meet2) return reconstructBidirectionalPath(meet2, parentStart, parentGoal);
  }

  return null; // Không tìm thấy đường đi

  function reconstructBidirectionalPath(meetingPoint, parentStart, parentGoal) {
    const [mr, mc] = meetingPoint;

    // Từ start → meetingPoint
    let pathStart = [];
    let cur = [mr, mc];
    while (cur) {
      pathStart.push(cur);
      cur = parentStart[cur[0]][cur[1]];
    }
    pathStart.reverse();

    // Từ meetingPoint → goal
    let pathGoal = [];
    cur = parentGoal[mr][mc];
    while (cur) {
      pathGoal.push(cur);
      cur = parentGoal[cur[0]][cur[1]];
    }

    return [...pathStart, ...pathGoal];
  }
}

export async function runBeamSearch(matrix, start, goal, onVisit, delay = 10, beamWidth = 3) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  function isValid(r, c) {
    return (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      matrix[r][c] !== 1
    );
  }

  function heuristic([r, c], [gr, gc]) {
    // Manhattan distance
    return Math.abs(r - gr) + Math.abs(c - gc);
  }

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

  let queue = [start];
  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    // Chọn beamWidth node gần goal nhất (theo heuristic)
    queue.sort((a, b) => heuristic(a, goal) - heuristic(b, goal));
    queue = queue.slice(0, beamWidth);

    const nextQueue = [];

    for (const [r, c] of queue) {
      onVisit(r, c);
      await sleep(delay);

      if (r === goal[0] && c === goal[1]) {
        let path = [];
        let cur = [r, c];
        while (cur) {
          path.push(cur);
          cur = parent[cur[0]][cur[1]];
        }
        return path.reverse();
      }

      const directions = [
        [1, 0], [-1, 0],
        [0, 1], [0, -1],
      ];

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (isValid(nr, nc) && !visited[nr][nc]) {
          visited[nr][nc] = true;
          parent[nr][nc] = [r, c];
          nextQueue.push([nr, nc]);
        }
      }
    }

    queue = nextQueue;
  }

  return null; // Không tìm thấy đường
}

export async function runIDAStar(matrix, start, goal, onVisit, delay = 10) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  function heuristic(a, b) {
    // Manhattan distance
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }

  function isValid(r, c) {
    return (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      matrix[r][c] !== 1
    );
  }

  async function dfs(r, c, g, threshold, parent, visited) {
    const f = g + heuristic([r, c], goal);
    if (f > threshold) return f;

    onVisit(r, c);
    await sleep(delay);

    if (r === goal[0] && c === goal[1]) {
      let path = [];
      let cur = [r, c];
      while (cur) {
        path.push(cur);
        cur = parent[cur[0]][cur[1]];
      }
      return path.reverse();
    }

    let minThreshold = Infinity;

    const directions = [
      [1, 0], [-1, 0],
      [0, 1], [0, -1],
    ];

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (!isValid(nr, nc) || visited[nr][nc]) continue;

      visited[nr][nc] = true;
      parent[nr][nc] = [r, c];

      const result = await dfs(nr, nc, g + 1, threshold, parent, visited);
      if (Array.isArray(result)) return result;
      if (result < minThreshold) minThreshold = result;

      visited[nr][nc] = false; // backtrack
    }

    return minThreshold;
  }

  const [sr, sc] = start;
  let threshold = heuristic(start, goal);

  while (true) {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
    visited[sr][sc] = true;

    const result = await dfs(sr, sc, 0, threshold, parent, visited);
    if (Array.isArray(result)) return result;
    if (result === Infinity) break; // không tìm được đường đi
    threshold = result;
  }

  return null;
}

export async function measurePath(algorithmFn, matrix, start, goal, onVisit, delay = 10, ...args) {
  const stats = {
    nodesExplored: 0,
    pathLength: 0,
    cost: 0,
    timeMs: 0,
  };

  const wrappedVisit = (r, c) => {
    stats.nodesExplored++;
    onVisit?.(r, c);
  };

  const startTime = performance.now();
  const path = await algorithmFn(matrix, start, goal, wrappedVisit, delay, ...args);
  const endTime = performance.now();

  if (path) {
    stats.pathLength = path.length;
    stats.cost = path.length;
  }

  stats.timeMs = +(endTime - startTime).toFixed(2);

  return {path, stats};
}