// Dijkstra's algorithm implementation for the grid visualizer

import { MinHeap } from './DataStructures/MinHeap';

export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;

    // Use MinHeap for O(log N) extractions
    const minHeap = new MinHeap();
    minHeap.insert(startNode);

    // Initialize all other nodes to infinity (function below does this implicitly if we strictly follow the new flow, 
    // but here we just need to ensure we don't assume they are in the heap yet).
    // The previous implementation 'getAllNodes' initialized nothing, it just flattened.
    // 'distance' property is already Infinity by default from App.js initialization.

    // To prevent infinite loops with duplicate entries in heap (lazy deletion),
    // we strictly check isVisited.

    while (!minHeap.isEmpty()) {
        const closestNode = minHeap.extractMin();

        // If we encouter a wall, we skip it.
        if (closestNode.isWall) continue;

        // If the node is already visited, it means we found a shorter path to it earlier 
        // and processed it, so this is a "stale" entry in the heap.
        if (closestNode.isVisited) continue;

        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid, minHeap);
    }
    return visitedNodesInOrder; // Return found path if queue empties
}


function updateUnvisitedNeighbors(node, grid, minHeap) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        const newDistance = node.distance + 1;
        if (newDistance < neighbor.distance) {
            neighbor.distance = newDistance;
            neighbor.previousNode = node;
            // Lazy insertion: We don't update key, we just insert.
            // Stale entries are handled by isVisited check in loop.
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


// Backtracks from the finishNode to find the shortest path.
// Only works after the dijkstra method above has been run.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null && currentNode !== undefined) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
        if (currentNode && currentNode.isStart) {
            nodesInShortestPathOrder.unshift(currentNode);
            break;
        }
    }
    return nodesInShortestPathOrder;
}
