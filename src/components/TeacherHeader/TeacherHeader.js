import React from 'react';
import styles from './TeacherHeader.module.css'

const TeacherHeader = () => {
    return (
        <header className={styles['teacher-header']}>
            <h2>Beschikbare docenten</h2>
        </header>
    );
};

export default TeacherHeader;