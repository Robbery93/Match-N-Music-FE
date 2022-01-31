import React from 'react';
import './BlueButton.css';

const BlueButton = ({ text, children}) => {

    return (
        <button
            className="blueButton"
            type="text"
        >
            {text}
            {children}
        </button>
    );
};

export default BlueButton;