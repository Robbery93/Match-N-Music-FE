import React from 'react';
import styles from './Header.module.css'

const Header = ({ text }) => {
    return (
            <h2 className={styles.teacher_header}>{text}</h2>
    );
};

export default Header;