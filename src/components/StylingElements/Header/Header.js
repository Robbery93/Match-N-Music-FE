import React from 'react';
import styles from './Header.module.css'
import Button from "../Button/Button";
import {useHistory} from "react-router-dom";

const Header = ({ text }) => {

    const history = useHistory();

    return (
        <div className={styles.teacher_header}>
            <Button text="Terug" color="orange" small="yes" onClick={() => history.goBack()} addStyle={styles.back_btn} />
            <h2>{text}</h2>
        </div>
    );
};

export default Header;