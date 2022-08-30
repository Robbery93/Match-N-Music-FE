import React from 'react';
import Avatar from "../Avatar/Avatar";
import styles from "./TeacherField.module.css";
import Preference from "../Preference/Preference";
import Details from "../Details/Details";
import Button from "../StylingElements/Button/Button";
import Background from "../StylingElements/Background/Background";
import axios from "axios";
import BigDisplayField from "../StylingElements/BigDisplayField/BigDisplayField";

const TeacherField = ({ name, age, residence, instrument, preference, description, isApplication, userId, teacherId,  photo }) => {

    async function applyForTeacher() {
        if(confirm("Weet je zeker dat je de les wil krijg van deze docent?")){
            try {
                await axios({
                    method: `POST`,
                    url : `http://localhost:8080/students/${userId}/apply?teacher_id=${teacherId}`,
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    }});
                location.reload();
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <Background specificBackground={styles.teacher_field}>
            <Avatar
                photo={`http://localhost:8080/files/download/${photo}`}
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

                <BigDisplayField text={description} />

            </section>

            <aside className={styles.buttons}>
            <Button text="Bekijk profiel" small="yes" color="blue" link={`/teacherprofile/${teacherId}`}/>
            {!isApplication && <Button text="Les aanvragen" color="green" small="yes" addStyle={styles.apply_btn} onClick={applyForTeacher}/>}
            </aside>
        </Background>
    );
};

export default TeacherField;