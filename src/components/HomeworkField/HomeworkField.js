import React from 'react';
import styles from "./HomeworkField.module.css"

const HomeworkField = ({ name, homework }) => {
    return (
        <div className={styles.homework}>
            <h3>Huiswerk van {name}</h3>
            <div className={styles.text}>
                {homework}
            </div>
        </div>
    );
};

export default HomeworkField;