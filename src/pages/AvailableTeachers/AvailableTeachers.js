import React from 'react';
import Header from "../../components/Header/Header";
import styles from "./AvailableTeachers.module.css"
import TeacherField from "../../components/TeacherField/TeacherField";

const AvailableTeachers = () => {
    return (
        <div className={styles.container}>
            <Header text="Beschikbare docenten" />
            <div className={styles.fields}>
            <TeacherField />
            </div>
        </div>
    );
};

export default AvailableTeachers;