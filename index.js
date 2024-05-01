function knightShortestPath(start, end) {
    const knightMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    let queue = [[start, 0, [start]]];
    let visited = new Set(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
        let [currentPos, currentMoveCount, path] = queue.shift();
        let [currentX, currentY] = currentPos;

        if (currentX === end[0] && currentY === end[1]) {
            return { moveCount: currentMoveCount, path: path };
        }

        knightMoves.forEach(([dx, dy]) => {
            let nextX = currentX + dx;
            let nextY = currentY + dy;

            if (isValidPosition(nextX, nextY) && !visited.has(`${nextX},${nextY}`)) {
                visited.add(`${nextX},${nextY}`);
                queue.push([[nextX, nextY], currentMoveCount + 1, [...path, [nextX, nextY]]]);
            }
        });
    }

    return { moveCount: -1, path: [] };  // No path found
}

function isValidPosition(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

// Example usage
let result = knightShortestPath([0, 0], [7, 7]);
console.log("Minimum moves:", result.moveCount);
console.log("Path:", result.path);