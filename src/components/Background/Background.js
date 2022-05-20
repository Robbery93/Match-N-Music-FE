import React from 'react';
import "./Background.css"

const Background = ({ children, specificBackground }) => {
    return (
        <span className={`background ${specificBackground}`}>
            {children}
        </span>
    );
};

export default Background;