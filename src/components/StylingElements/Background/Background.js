import React from 'react';
import "./Background.css"

const Background = ({ children, color, specificBackground }) => {
    return (
        <div
            className={color ? `background ${color}-background`: "background blue-background"}
            id={specificBackground}
        >
            {children}
        </div>
    );
};

export default Background;