import React, { useState } from 'react';
import Node from './Node';
import './VisualizerCanvas.css';

const GridStage = ({ grid, nodeSize, onNodeClick, onNodeMouseEnter, onNodeMouseUp }) => {
    return (
        <div className="grid-stage">
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} className="grid-row">
                            {row.map((node, nodeIdx) => {
                                const { row, col, isStart, isFinish, isWall, isVisited, isShortestPath } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        row={row}
                                        nodeSize={nodeSize}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        isWall={isWall}
                                        isVisited={isVisited}
                                        isShortestPath={isShortestPath}
                                        onMouseDown={onNodeClick}
                                        onMouseEnter={onNodeMouseEnter}
                                        onMouseUp={onNodeMouseUp}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GridStage;
