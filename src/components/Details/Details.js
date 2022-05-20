import React from 'react';
import styles from "./Details.module.css";
import {ReactComponent as LocationPin} from "../../assets/location-pin.svg";

const Details = ({ name, age, residence, instrument }) => {
    return (
        <div className={styles.details_field}>
            <h2>{name}<span>{age} jaar</span></h2>
            <div className={styles.location}>
                <LocationPin />
                <p>{residence}</p>
                <p>{instrument}</p>
            </div>
        </div>
    );
};

export default Details;