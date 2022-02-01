import React from 'react';
import TeacherHeader from "../../components/TeacherHeader/TeacherHeader";
import styles from "./AvailableTeachers.module.css"
import TeacherField from "../../components/TeacherField/TeacherField";

const AvailableTeachers = () => {
    return (
        <div className={styles.container}>
            <TeacherHeader />
            <div className={styles.fields}>
            <TeacherField />
            </div>
        </div>
    );
};

export default AvailableTeachers;