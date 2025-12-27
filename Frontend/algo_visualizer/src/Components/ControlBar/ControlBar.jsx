import React from 'react';
import './ControlBar.css';

const ControlBar = ({
    mode,
    onGenerate,
    onStart,
    onStop,
    onPause,
    onAlgorithmChange,
    onSpeedChange,
    onSizeChange,
    isSorting,
    isPaused,
    selectedAlgorithm
}) => {
    return (
        <div className="control-bar glass">
            <div className="control-group">
                <label>{mode === 'sorting' ? 'Algorithm' : 'Search'}</label>
                <select
                    value={selectedAlgorithm}
                    onChange={(e) => onAlgorithmChange(e.target.value)}
                    disabled={isSorting}
                    className="custom-select"
                >
                    {mode === 'sorting' ? (
                        <>
                            <option value="bubble">Bubble Sort</option>
                            <option value="insertion">Insertion Sort</option>
                            <option value="selection">Selection Sort</option>
                            <option value="quick">Quick Sort</option>
                            <option value="merge">Merge Sort</option>
                        </>
                    ) : (
                        <>
                            <option value="dijkstra">Dijkstra's</option>
                            <option value="astar">A* Search</option>
                            <option value="bfs">Breadth First Search</option>
                            <option value="dfs">Depth First Search</option>
                        </>
                    )}
                </select>
            </div>

            <div className="control-divider"></div>

            <div className="control-group slider-group">
                <div className="slider-header">
                    <label>Speed</label>
                </div>
                <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue="50"
                    onChange={(e) => onSpeedChange(e.target.value)}
                    disabled={isSorting && !isPaused}
                />
            </div>

            <div className="control-group slider-group">
                <div className="slider-header">
                    <label>{mode === 'sorting' ? 'Array Size' : 'Grid Size'}</label>
                </div>
                <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="50"
                    onChange={(e) => onSizeChange(e.target.value)}
                    disabled={isSorting}
                />
            </div>

            <div className="control-divider"></div>

            <div className="button-group">
                {!isSorting ? (
                    <>
                        <button
                            className="secondary-btn"
                            onClick={onGenerate}
                            disabled={isSorting}
                        >
                            {mode === 'sorting' ? 'New Array' : 'Clear Board'}
                        </button>
                        <button
                            className="neon-button start-btn"
                            onClick={onStart}
                        >
                            {mode === 'sorting' ? 'Start Visual' : 'Find Path'}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className={`secondary-btn ${isPaused ? 'paused' : ''}`}
                            onClick={onPause}
                        >
                            {isPaused ? 'Resume' : 'Pause'}
                        </button>
                        <button
                            className="stop-btn"
                            onClick={onStop}
                        >
                            Stop
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ControlBar;
