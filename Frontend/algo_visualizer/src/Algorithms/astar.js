// A* Search algorithm implementation for the grid visualizer

import { MinHeap } from './DataStructures/MinHeap';

export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.totalDistance = manhattanDistance(startNode, finishNode);

    // Use MinHeap for O(log N) extractions
    const minHeap = new MinHeap();
    minHeap.insert(startNode);

    while (!minHeap.isEmpty()) {
        const closestNode = minHeap.extractMin();

        if (closestNode.isWall) continue;
        if (closestNode.isVisited) continue;

        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid, finishNode, minHeap);
    }
    return visitedNodesInOrder;
}

function manhattanDistance(nodeA, nodeB) {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}


function updateUnvisitedNeighbors(node, grid, finishNode, minHeap) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        const distanceToNeighbor = node.distance + 1;
        if (distanceToNeighbor < neighbor.distance) {
            neighbor.distance = distanceToNeighbor;
            neighbor.totalDistance = distanceToNeighbor + manhattanDistance(neighbor, finishNode);
            neighbor.previousNode = node;
            minHeap.insert(neighbor);
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

