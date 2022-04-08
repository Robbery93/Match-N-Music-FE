import React from 'react';
import styles from "./Price.css"

const Price = ( {price} ) => {
    return (
        <div className={styles.container}>
            <h4>Prijs per 30 minuten:</h4>
            <div className={styles['price-container']}>
                <p>€{price},-</p>
            </div>
        </div>
    );
};

export default Price;