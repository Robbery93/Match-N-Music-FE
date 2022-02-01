import React from 'react';
import skeleton from "../../../assets/skeleton.jpg"
import styles from "./TeacherAvatar.module.css"

const TeacherAvatar = () => {
    return (
        <img className={styles.avatar} src={skeleton} alt="profiel foto van docent" />
    );
};

export default TeacherAvatar;