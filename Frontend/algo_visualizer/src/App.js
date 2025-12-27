import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './Components/Navbar/Navbar';
import ControlBar from './Components/ControlBar/ControlBar';
import VisualizerCanvas from './Components/VisualizerCanvas/VisualizerCanvas';
import InfoFooter from './Components/InfoFooter/InfoFooter';

// Import Algorithms
import { bubbleSort } from './Algorithms/bubbleSort';
import { insertionSort } from './Algorithms/insertionSort';
import { selectionSort } from './Algorithms/selectionSort';
import { quickSort } from './Algorithms/quickSort';
import { mergeSort } from './Algorithms/mergeSort';
import { dijkstra, getNodesInShortestPathOrder } from './Algorithms/dijkstra';
import { astar } from './Algorithms/astar';
import { bfs } from './Algorithms/bfs';
import { dfs } from './Algorithms/dfs';
import { sleep } from './Algorithms/utils';

import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(50);
  const [size, setSize] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState("sorting");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (mode === 'sorting') setAlgorithm('bubble');
    if (mode === 'pathfinding') setAlgorithm('dijkstra');
  }, [mode]);

  // Ref for real-time control signals in async loops
  const controlRef = useRef({ isPaused: false, isStopped: false });

  // States for visualization
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  // Grid States
  const [grid, setGrid] = useState([]);
  const mouseIsPressed = useRef(false);

  // Initialize Grid/Array
  useEffect(() => {
    if (mode === 'sorting') {
      generateNewArray();
    } else {
      const initialGrid = getInitialGrid();
      setGrid(initialGrid);
    }
  }, [size, mode]);

  const getInitialGrid = () => {
    const newGrid = [];
    const rows = Math.floor(size / 2.5);
    const cols = size;
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(col, row, rows, cols));
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  };

  const createNode = (col, row, rows, cols) => {
    return {
      col,
      row,
      isStart: row === Math.floor(rows / 2) && col === Math.floor(cols / 4),
      isFinish: row === Math.floor(rows / 2) && col === Math.floor(3 * cols / 4),
      isWall: false,
      isVisited: false,
      isShortestPath: false,
      distance: Infinity,
      previousNode: null,
    };
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleNodeClick = useCallback((row, col) => {
    if (isSorting || mode !== 'pathfinding') return;
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      const node = newGrid[row][col];
      if (node.isStart || node.isFinish) return prevGrid;
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = newNode;
      return newGrid;
    });
    mouseIsPressed.current = true;
  }, [isSorting, mode]);

  const handleNodeMouseEnter = useCallback((row, col) => {
    if (!mouseIsPressed.current || isSorting || mode !== 'pathfinding') return;
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      const node = newGrid[row][col];
      if (node.isStart || node.isFinish) return prevGrid;
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = newNode;
      return newGrid;
    });
  }, [isSorting, mode]);

  const handleNodeMouseUp = useCallback(() => {
    mouseIsPressed.current = false;
  }, []);

  // Sync state with ref
  useEffect(() => {
    controlRef.current.isPaused = isPaused;
  }, [isPaused]);

  const generateNewArray = () => {
    if (isSorting) return;
    controlRef.current.isStopped = false;
    const newArray = [];
    for (let i = 0; i < size; i++) {
      // Ensure minimum height for visibility
      newArray.push(Math.floor(Math.random() * 380) + 20);
    }
    setArray(newArray);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
  };

  const handleStart = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setIsPaused(false);
    controlRef.current.isStopped = false;
    controlRef.current.isPaused = false;

    // Reset highlights before starting
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);

    if (mode === 'pathfinding') {
      setGrid(prevGrid =>
        prevGrid.map(row =>
          row.map(node => ({
            ...node,
            isVisited: false,
            isShortestPath: false,
            distance: Infinity,
            previousNode: null,
          }))
        )
      );
      // Small delay to ensure state update before algorithm starts
      await sleep(10, controlRef);
    }

    try {
      if (mode === 'sorting') {
        switch (algorithm) {
          case 'bubble':
            await bubbleSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
            break;
          case 'insertion':
            await insertionSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
            break;
          case 'selection':
            await selectionSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
            break;
          case 'quick':
            await quickSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
            break;
          case 'merge':
            await mergeSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
            break;
          default:
            break;
        }
      } else {
        // Pathfinding Mode
        const rows = grid.length;
        const cols = grid[0].length;
        const startNode = grid[Math.floor(rows / 2)][Math.floor(cols / 4)];
        const finishNode = grid[Math.floor(rows / 2)][Math.floor(3 * cols / 4)];

        // Clone grid to avoid direct state mutation during calculation
        const gridClone = grid.map(row => row.map(node => ({ ...node })));
        const startNodeClone = gridClone[startNode.row][startNode.col];
        const finishNodeClone = gridClone[finishNode.row][finishNode.col];

        let visitedNodesInOrder = [];
        switch (algorithm) {
          case 'dijkstra':
            visitedNodesInOrder = dijkstra(gridClone, startNodeClone, finishNodeClone);
            break;
          case 'astar':
            visitedNodesInOrder = astar(gridClone, startNodeClone, finishNodeClone);
            break;
          case 'bfs':
            visitedNodesInOrder = bfs(gridClone, startNodeClone, finishNodeClone);
            break;
          case 'dfs':
            visitedNodesInOrder = dfs(gridClone, startNodeClone, finishNodeClone);
            break;
          default:
            break;
        }

        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNodeClone);

        await animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, controlRef);
      }
    } catch (error) {
      if (error === 'STOPPED') {
        console.log("Visualization stopped by user");
      } else {
        console.error("Visualization error:", error);
      }
    } finally {
      setIsSorting(false);
      setIsPaused(false);
      setComparingIndices([]);
      setSwappingIndices([]);
    }
  };

  const animateDijkstra = async (visitedNodesInOrder, nodesInShortestPathOrder, controlRef) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (controlRef.current.isStopped) break;
      while (controlRef.current.isPaused) {
        await sleep(100, controlRef);
      }

      if (i === visitedNodesInOrder.length) {
        await animateShortestPath(nodesInShortestPathOrder, controlRef);
        return;
      }

      const node = visitedNodesInOrder[i];
      if (node.isStart || node.isFinish) continue;

      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        const newRow = [...newGrid[node.row]];
        newRow[node.col] = {
          ...newRow[node.col],
          isVisited: true,
        };
        newGrid[node.row] = newRow;
        return newGrid;
      });

      await sleep(101 - speed, controlRef);
    }
  };

  const animateShortestPath = async (nodesInShortestPathOrder, controlRef) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (controlRef.current.isStopped) break;
      while (controlRef.current.isPaused) {
        await sleep(100, controlRef);
      }

      const node = nodesInShortestPathOrder[i];
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        const newRow = [...newGrid[node.row]];
        newRow[node.col] = {
          ...newRow[node.col],
          isShortestPath: true,
        };
        newGrid[node.row] = newRow;
        return newGrid;
      });
      await sleep(50, controlRef);
    }
  };

  const handleStop = () => {
    controlRef.current.isStopped = true;
    setIsSorting(false);
    setIsPaused(false);
    setComparingIndices([]);
    setSwappingIndices([]);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const getComplexity = (algo) => {
    const complexities = {
      'bubble': 'O(n²)',
      'insertion': 'O(n²)',
      'selection': 'O(n²)',
      'quick': 'O(n log n)',
      'merge': 'O(n log n)',
      'dijkstra': 'O(E + V log V)',
      'astar': 'O(E)',
      'bfs': 'O(V + E)',
      'dfs': 'O(V + E)'
    };
    return complexities[algo] || 'O(n²)';
  };

  const handleGenerate = () => {
    if (isSorting) return;
    if (mode === 'sorting') {
      generateNewArray();
    } else {
      const initialGrid = getInitialGrid();
      setGrid(initialGrid);
    }
  };

  return (
    <div className="App">
      <div className="background-glow"></div>

      <Navbar mode={mode} setMode={setMode} isSorting={isSorting} />

      <ControlBar
        mode={mode}
        selectedAlgorithm={algorithm}
        onAlgorithmChange={setAlgorithm}
        onSpeedChange={setSpeed}
        onSizeChange={setSize}
        onGenerate={handleGenerate}
        onStart={handleStart}
        onStop={handleStop}
        onPause={handlePause}
        isSorting={isSorting}
        isPaused={isPaused}
      />

      <VisualizerCanvas
        mode={mode}
        array={array}
        size={size}
        grid={grid}
        onNodeClick={handleNodeClick}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseUp={handleNodeMouseUp}
        comparingIndices={comparingIndices}
        swappingIndices={swappingIndices}
        sortedIndices={sortedIndices}
      />

      <InfoFooter
        complexity={getComplexity(algorithm)}
      />
    </div>
  );
}

export default App;
