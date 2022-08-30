import React from 'react';
import styles from "./Details.module.css";
import {ReactComponent as LocationPin} from "../../assets/location-pin.svg";

const Details = ({ name, age, residence, instrument }) => {
    return (
        <div className={styles.details}>
            <span className={styles.details_header}>
                <h2>{name} <p>{age} jaar</p></h2>
            </span>
            <span className={styles.location}>
                <LocationPin />
                <p>{residence}, {instrument}</p>
            </span>
        </div>
    );
};

export default Details;