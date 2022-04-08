import React from 'react';
import styles from "./Details.module.css";
import {ReactComponent as LocationPin} from "../../assets/location-pin.svg";

const Details = ({ name, age, residence}) => {
    return (
        <div className={styles['details-field']}>
            <h2>{name}<span>{age} jaar</span></h2>
            <div className={styles.location}>
                <LocationPin />
                <p>{residence}</p>
            </div>
        </div>
    );
};

export default Details;