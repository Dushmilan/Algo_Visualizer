import React from 'react';
import ArrayBar from './ArrayBar';
import GridStage from './GridStage';
import './VisualizerCanvas.css';

const VisualizerCanvas = ({
    mode,
    array,
    size,
    grid,
    onNodeClick,
    onNodeMouseEnter,
    onNodeMouseUp,
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = []
}) => {
    // Calculate dynamic bar width based on container width and array size
    const barWidth = Math.floor(Math.min(800 / size, 30));

    // Calculate dynamic node size for pathfinding
    const rows = grid.length || 1;
    const cols = grid[0]?.length || 1;
    const nodeSize = Math.floor(Math.min(1000 / cols, 460 / rows, 25));

    return (
        <main className="visualizer-container">
            <div className="canvas glass">
                {mode === 'sorting' ? (
                    <div className="array-container">
                        {array.map((value, idx) => {
                            let status = 'idle';
                            if (comparingIndices.includes(idx)) status = 'comparing';
                            if (swappingIndices.includes(idx)) status = 'swapping';
                            if (sortedIndices.includes(idx)) status = 'sorted';

                            return (
                                <ArrayBar
                                    key={idx}
                                    height={value}
                                    width={barWidth}
                                    status={status}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <GridStage
                        grid={grid}
                        nodeSize={nodeSize}
                        onNodeClick={onNodeClick}
                        onNodeMouseEnter={onNodeMouseEnter}
                        onNodeMouseUp={onNodeMouseUp}
                    />
                )}
            </div>
        </main>
    );
};

export default VisualizerCanvas;
