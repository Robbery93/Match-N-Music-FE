import React from 'react';
import styles from "./Description.module.css"

const Description = ({ description }) => {
    return (
        <main className={styles.main}>
            {description}
        </main>
    );
};

export default Description;