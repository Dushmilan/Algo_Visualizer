import React from 'react';
import './InfoFooter.css';

const InfoFooter = ({ complexity = 'O(n²)' }) => {
    return (
        <footer className="footer-info glass">
            <div className="legend">
                <div className="legend-item">
                    <span className="dot default"></span>
                    <span>Idle</span>
                </div>
                <div className="legend-item">
                    <span className="dot comparing"></span>
                    <span>Comparing</span>
                </div>
                <div className="legend-item">
                    <span className="dot swapping"></span>
                    <span>Swapping</span>
                </div>
                <div className="legend-item">
                    <span className="dot sorted"></span>
                    <span>Sorted</span>
                </div>
            </div>
            <div className="stats">
                Complexity: <span className="mono">{complexity}</span>
            </div>
        </footer>
    );
};

export default InfoFooter;
