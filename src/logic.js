const knightMoves = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function isValidPosition(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function findNextMoves(currentX, currentY) {
  return knightMoves.map(([x, y]) => [currentX + x, currentY + y]);
}

function findShortestPath(start, end) {
  let queue = [[start, 0, [start]]];
  let visited = new Set();

  while (queue.length > 0) {
    let [currentPos, currentMoveCount, path] = queue.shift();
    let [currentX, currentY] = currentPos;

    if (currentX === end[0] && currentY === end[1]) {
      return { moveCount: currentMoveCount, path: path };
    }

    let nextPositions = findNextMoves(currentX, currentY);

    for (let [nextX, nextY] of nextPositions) {
      if (isValidPosition(nextX, nextY) && !visited.has(`${nextX},${nextY}`)) {
        visited.add(`${nextX},${nextY}`);
        queue.push([
          [nextX, nextY],
          currentMoveCount + 1,
          [...path, [nextX, nextY]],
        ]);
      }
    }
  }

  return null; // No path found
}

const result = findShortestPath([0, 0], [7, 7]);

if (result) {
  console.log("Minimum moves:", result.moveCount);
  console.log("Path:", result.path);
} else {
  console.log("No path found.");
}
