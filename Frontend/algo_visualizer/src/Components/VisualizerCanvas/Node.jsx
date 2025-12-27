import React, { memo } from 'react';
import './Node.css';

const Node = ({
    row,
    col,
    nodeSize,
    isStart,
    isFinish,
    isWall,
    isVisited,
    isShortestPath,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
}) => {
    const extraClassName = isFinish
        ? 'node-finish'
        : isStart
            ? 'node-start'
            : isWall
                ? 'node-wall'
                : isShortestPath
                    ? 'node-shortest-path'
                    : isVisited
                        ? 'node-visited'
                        : '';

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            style={{ width: `${nodeSize}px`, height: `${nodeSize}px` }}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></div>
    );
};

// Custom comparison for memoization
const areEqual = (prevProps, nextProps) => {
    return (
        prevProps.isStart === nextProps.isStart &&
        prevProps.isFinish === nextProps.isFinish &&
        prevProps.isWall === nextProps.isWall &&
        prevProps.isVisited === nextProps.isVisited &&
        prevProps.isShortestPath === nextProps.isShortestPath &&
        prevProps.nodeSize === nextProps.nodeSize
    );
};

export default memo(Node, areEqual);
