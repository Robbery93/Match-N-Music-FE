import React from 'react';
import "./Background.css"

const Background = ({ children, specificBackground }) => {
    return (
        <div
            className="background"
            id={specificBackground}
        >
            {children}
        </div>
    );
};

export default Background;