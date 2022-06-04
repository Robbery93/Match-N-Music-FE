import React from 'react';
import styles from "./HomeworkField.module.css"
import Background from "../StylingElements/Background/Background";

const HomeworkField = ({ name, homework }) => {
    return (
        <div className={styles.homework}>
            <h3>Huiswerk van {name}</h3>
            <Background color="white">
                <p className={styles.text}>
                    {homework}
                </p>
            </Background>
        </div>
    );
};

export default HomeworkField;