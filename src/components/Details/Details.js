import React from 'react';
import styles from "./Details.module.css";
import {ReactComponent as LocationPin} from "../../assets/location-pin.svg";

const Details = ({ name, age, residence, instrument }) => {
    return (
        <div className={styles.details_field}>
            <h2>{name}<p>{age} jaar</p></h2>
            <span className={styles.location}>
                <LocationPin />
                <p>{residence}</p>
                <p>{instrument}</p>
            </span>
        </div>
    );
};

export default Details;