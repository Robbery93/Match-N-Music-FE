import React from 'react';
import styles from "./GreenButton.module.css";

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