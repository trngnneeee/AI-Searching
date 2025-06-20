export function generateWalkableMatrix(size = 25) {
  const matrix = Array.from({ length: size }, () => Array(size).fill(1));

  const start = [0, Math.floor(Math.random() * size)];
  const goal = [size - 1, Math.floor(Math.random() * size)];
  setStart(start);
  setGoal(goal);

  let [r, c] = start;
  matrix[r][c] = 2;

  while (r !== goal[0] || c !== goal[1]) {
    if (r < goal[0]) r++;
    else if (r > goal[0]) r--;

    matrix[r][c] = 0;

    if (c < goal[1]) c++;
    else if (c > goal[1]) c--;

    matrix[r][c] = 0;
  }

  matrix[goal[0]][goal[1]] = 3;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === 1 && Math.random() < 0.4) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
}