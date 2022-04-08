import React from 'react';
import './BlueButton.module.css';
import styles from "./BlueButton.module.css"

const BlueButton = ({ onClick, text }) => {
    return (
        <button
            className={styles.button}
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default BlueButton;