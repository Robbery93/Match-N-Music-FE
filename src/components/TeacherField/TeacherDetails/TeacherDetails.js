import React from 'react';
import {ReactComponent as LocationPin} from "../../../assets/location-pin.svg";
import styles from "./TeacherDetails.module.css"

const TeacherDetails = () => {
    return (
        <div className={styles['details-field']}>
            <h2>Naam van docent</h2>
            <div className={styles.location}>
            <LocationPin />
            <p>Woonplaats van docent</p>
            </div>
        </div>
    );
};

export default TeacherDetails;