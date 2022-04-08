import React from 'react';
import styles from './Header.module.css'

const Header = ({ text }) => {
    return (
        <header className={styles['teacher-header']}>
            <h2>{text}</h2>
        </header>
    );
};

export default Header;