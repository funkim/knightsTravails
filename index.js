function knightShortestPath(start, end) {
    // Directions a knight can move on a chessboard
    const knightMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    // Initialize a queue with the starting position and an initial move count of 0
    let queue = [[start, 0]];
    // Set to keep track of visited positions, formatted as 'x,y' to avoid revisiting
    let visited = new Set([`${start[0]},${start[1]}`]);

    // Process each position in the queue
    while (queue.length > 0) {
        let [[currentX, currentY], currentMoveCount] = queue.shift();

        // Check if the current position is the target position
        if (currentX === end[0] && currentY === end[1]) {
            return currentMoveCount;
        }

        // Explore all valid moves from the current position
        for (let [dx, dy] of knightMoves) {
            let nextX = currentX + dx;
            let nextY = currentY + dy;

            // Check if the next position is within the bounds of the chessboard and not visited
            if (isValidPosition(nextX, nextY) && !visited.has(`${nextX},${nextY}`)) {
                visited.add(`${nextX},${nextY}`);
                queue.push([[nextX, nextY], currentMoveCount + 1]);
            }
        }
    }

    // If no valid path was found (which is unusual in a standard chess game)
    return -1;
}

// Helper function to check if a position is within the 8x8 chessboard
function isValidPosition(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

// Example usage
console.log(knightShortestPath([0, 0], [7, 7])); // Outputs the minimum number of moves required
