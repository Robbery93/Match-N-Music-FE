import React from 'react';
import styles from "./Preference.css"

const Preference = ({ preference }) => {
    return (
        <div className={styles.container}>
            <h4>Lesvorm:</h4>
            <div className={styles['preference-container']}>
                <p>{preference}</p>
            </div>
        </div>
    );
};

export default Preference;