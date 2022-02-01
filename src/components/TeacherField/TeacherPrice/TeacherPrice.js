import React from 'react';
import styles from "./TeacherPrice.module.css"

const TeacherPrice = () => {
    return (
        <div className={styles.container}>
            <h4>Prijs per 30 minuten:</h4>
            <div className={styles['price-container']}>
                <p>€30,-</p>
            </div>
        </div>
    );
};

export default TeacherPrice;