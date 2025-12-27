import React from 'react';
import './Navbar.css';

const Navbar = ({ mode, setMode, isSorting }) => {
    return (
        <nav className="navbar glass">
            <div className="nav-logo">
                <span className="logo-text">ALGO<span className="logo-accent">//</span>VISA</span>
            </div>
            <div className="nav-links">
                <div
                    className={`nav-item ${mode === 'sorting' ? 'active' : ''}`}
                    onClick={() => !isSorting && setMode('sorting')}
                >
                    Sorting
                </div>
                <div
                    className={`nav-item ${mode === 'pathfinding' ? 'active' : ''}`}
                    onClick={() => !isSorting && setMode('pathfinding')}
                >
                    Pathfinding
                </div>
                <div className="nav-item disabled">Graphs (Soon)</div>
            </div>
            <div className="nav-status">
                <div className="status-dot"></div>
                <span className="status-text">{isSorting ? 'Processing...' : 'System Ready'}</span>
            </div>
        </nav>
    );
};

export default Navbar;
