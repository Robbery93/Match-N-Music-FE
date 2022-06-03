import React from 'react';
import styles from "./ErrorText.module.css";

const ErrorText = ({errorMessage} ) => {
    return (
        <p className={styles.error}>{errorMessage}</p>
    );
};

export default ErrorText;