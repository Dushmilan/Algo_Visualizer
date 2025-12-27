import React, { memo } from 'react';
import './ArrayBar.css';

const ArrayBar = ({ height, width, status }) => {
    return (
        <div
            className={`array-bar ${status}`}
            style={{
                height: `${height}px`,
                width: `${width}px`
            }}
        ></div>
    );
};

export default memo(ArrayBar);
