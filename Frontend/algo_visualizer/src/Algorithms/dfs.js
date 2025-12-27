// DFS algorithm implementation for the grid visualizer

export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const stack = [{ node: startNode, parent: null }];

    while (stack.length > 0) {
        const { node, parent } = stack.pop();

        if (node.isWall) continue;
        if (node.isVisited) continue;

        node.isVisited = true;
        node.previousNode = parent;
        visitedNodesInOrder.push(node);

        if (node === finishNode) return visitedNodesInOrder;

        const neighbors = getUnvisitedNeighbors(node, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                stack.push({ node: neighbor, parent: node });
            }
        }
    }
    return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    // Order of neighbors can affect DFS path exploration direction
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}
