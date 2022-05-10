import React, {useEffect, useState} from 'react';
import Avatar from "../Avatar/Avatar";
import styles from "./TeacherField.module.css";
import Preference from "./Preference/Preference";
import Description from "../Description/Description";
import GreenButton from "../GreenButton/GreenButton";
import Details from "../Details/Details";
import robbert from "../../assets/Robbert.jpg";
import axios from "axios";

const TeacherField = ({ name, age, residence, preference, description }) => {

    return (
        <>
            {Object.keys(teachers).length > 0 &&
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
                    <GreenButton
                        text="Les aanvragen"
                    />
                </div>
            </div>
            }
        </>
    );
};

export default TeacherField;