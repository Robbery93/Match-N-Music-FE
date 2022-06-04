import React from 'react';
import Avatar from "../Avatar/Avatar";
import styles from "./TeacherField.module.css";
import Preference from "./Preference/Preference";
import Description from "../Description/Description";
import Details from "../Details/Details";
import robbert from "../../assets/Robbert.jpg";
import Button from "../StylingElements/Button/Button";

const TeacherField = ({ name, age, residence, instrument, preference, description }) => {

    return (
        <div className={styles.field}>
            <div className={styles.details}>
                <Avatar
                    photo={robbert}
                    alt="Foto van docent"/>
                <div className={styles.text}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <Details
                                name={name}
                                age={age}
                                residence={residence}
                                instrument={instrument}
                            />
                        </div>
                        <div className={styles.right}>
                            <Preference
                                preference={preference}
                            />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <Description
                            description={description}/>
                    </div>
                </div>
            </div>
            <div className={styles.button}>
                <Button text="Les aanvragen" color="green" />
            </div>
        </div>
    );
};

export default TeacherField;