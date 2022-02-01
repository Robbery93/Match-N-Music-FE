import React from 'react';
import styles from "../BlueButton/BlueButton.module.css";

const GreenButton = ({ onClick, text }) => {
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

export default GreenButton;