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

const TeacherField = ({ name, age, residence, instrument, preference, description, userId, teacherId }) => {

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    async function applyForTeacher() {
        try {
            await axios.post(`http://localhost:8080/students/${userId}/apply?teacher_id=${teacherId}`, axiosConfig)
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
            <Button text="Les aanvragen" color="green" small="yes" addStyle={styles.apply_btn} onClick={applyForTeacher}/>
        </Background>
    );
};

export default TeacherField;