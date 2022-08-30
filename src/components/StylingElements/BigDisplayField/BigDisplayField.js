import React from 'react';
import styles from "./BigDisplayField.module.css"

const BigDisplayField = ({ text }) => {
    return (
        <div className={styles.container}>
            <p>{text}</p>
        </div>
    );
};

export default BigDisplayField;