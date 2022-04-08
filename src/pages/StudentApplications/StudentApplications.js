import React from 'react';
import Header from "../../components/Header/Header";
import styles from "./StudentApplications.module.css"
import StudentField from "../../components/StudentField/StudentField";

const StudentApplications = () => {
    return (
        <div className={styles.container}>
            <Header text="Aanvragen van leerlingen" />
            <div className={styles.fields}>
                <StudentField />
            </div>
        </div>
    );
};

export default StudentApplications;