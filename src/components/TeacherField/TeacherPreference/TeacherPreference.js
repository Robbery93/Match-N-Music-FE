import React from 'react';
import styles from "./TeacherPreference.module.css"

const TeacherPreference = () => {
    return (
        <div className={styles.container}>
            <h4>Lesvorm:</h4>
            <div className={styles['preference-container']}>
                <p>Live les en Online les</p>
            </div>
        </div>
    );
};

export default TeacherPreference;