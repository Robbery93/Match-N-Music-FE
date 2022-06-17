import React from 'react';
import Avatar from "../Avatar/Avatar";
import styles from "./TeacherField.module.css";
import Preference from "./Preference/Preference";
import Description from "../Description/Description";
import Details from "../Details/Details";
import robbert from "../../assets/Robbert.jpg";
import Button from "../StylingElements/Button/Button";
import Background from "../StylingElements/Background/Background";
import axios from "axios";

const TeacherField = ({ name, age, residence, instrument, preference, description, isApplication, userId, teacherId }) => {

    async function applyForTeacher() {
        try {
            await axios({
                method: `POST`,
                url : `http://localhost:8080/students/${userId}/apply?teacher_id=${teacherId}`,
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }});
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Background>
            <Avatar
                photo={robbert}
                alt="Foto van docent"/>

            <section className={styles.info}>
                <span className={styles.info_top}>
                    <Details
                        name={name}
                        age={age}
                        residence={residence}
                        instrument={instrument}
                    />
                    <Preference
                        preference={preference}
                    />
                </span>

                <Description
                    description={description}
                />

            </section>

            {!isApplication && <Button text="Les aanvragen" color="green" small="yes" addStyle={styles.apply_btn} onClick={applyForTeacher}/>}
        </Background>
    );
};

export default TeacherField;