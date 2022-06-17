import React, {useContext} from 'react';
import styles from "./StudentField.module.css"
import Avatar from "../Avatar/Avatar";
import Details from "../Details/Details";
import floortje from "../../assets/Floortje.jpg"
import Button from "../StylingElements/Button/Button";
import Preference from "../Preference/Preference";
import Background from "../StylingElements/Background/Background";
import BigDisplayField from "../StylingElements/BigDisplayField/BigDisplayField";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const StudentField = ({ name, age, residence, instrument, preference, request, studentId }) => {

    const { user } = useContext(AuthContext);

    const handleClick = () => {
        if(confirm("Weet je zeker dat je deze leerling les wil gaan geven?")) {
            acceptApplication();
        }
    }

    async function acceptApplication() {
        try{
        await axios({
            method: 'PATCH',
            url: `http://localhost:8080/teachers/${user.id}/update_homework?student_id=${studentId}`,
            data: {
                homework: ""
            },
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }});
            console.log("Het is gelukt")
            location.reload();
        } catch (e) {
            console.error(e.message)
        }
    }

    return (
        <>
            <Background specificBackground={styles.student_application}>
            <Avatar
                photo={floortje}
                alt="foto van leerling" />

                <section className={styles.info}>
                    <span className={styles.info_top}>
                    <Details
                        name={name}
                        age={age}
                        residence={residence}
                        instrument={instrument}
                    />
                    <Preference preference={preference} />
                </span>

                    <BigDisplayField text={request} />
                </section>

            <div className={styles.button}>
                <Button text="Aanvraag accepteren" color="green" small="yes" onClick={handleClick}/>
            </div>
            </Background>
        </>
    );
};

export default StudentField;