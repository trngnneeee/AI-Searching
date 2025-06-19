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
