import React from 'react';
import './Button.css';

const Button = ({ color, type, onClick, text }) => {
    return (
        <button
            className={`button ${color}-button`}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;