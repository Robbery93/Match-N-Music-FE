import React from 'react';
import TeacherAvatar from "./TeacherAvatar/TeacherAvatar";
import styles from "./TeacherField.module.css"
import TeacherDetails from "./TeacherDetails/TeacherDetails";
import TeacherPrice from "./TeacherPrice/TeacherPrice";
import TeacherPreference from "./TeacherPreference/TeacherPreference";
import TeacherDescription from "./TeacherDescription/TeacherDescription";
import GreenButton from "../GreenButton/GreenButton";

const TeacherField = () => {
    return (
        <div className={styles.field}>
            <div className={styles.details}>
                <TeacherAvatar />
                <div className={styles.text}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <TeacherDetails />
                        </div>
                        <div className={styles.right}>
                            <TeacherPrice />
                            <TeacherPreference />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <TeacherDescription />
                    </div>
                </div>
            </div>
            <div className={styles.button}>
                <GreenButton
                    text="Les aanvragen"
                />
            </div>
        </div>
    );
};

export default TeacherField;