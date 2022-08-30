import React, {useContext} from 'react';
import styles from "./StudentField.module.css"
import Avatar from "../Avatar/Avatar";
import Details from "../Details/Details";
import Button from "../StylingElements/Button/Button";
import Preference from "../Preference/Preference";
import Background from "../StylingElements/Background/Background";
import BigDisplayField from "../StylingElements/BigDisplayField/BigDisplayField";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const StudentField = ({ name, age, residence, instrument, preference, request, photo, isActive, studentId }) => {

    const { user } = useContext(AuthContext);

    const handleApplication = () => {
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
                homework: "De docent heeft nog geen huiswerk opgegeven."
            },
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }});
            location.reload();
        } catch (e) {
            console.error(e.message)
        }
    }

    return (
        <>
            <Background specificBackground={styles.student_field}>
            <Avatar
                photo={`http://localhost:8080/files/download/${photo}`}
                alt="Foto van leerling" />

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

            <div className={styles.buttons}>
                <Button text="Bekijk profiel" small="yes" color="blue" link={`/studentprofile/${studentId}`}/>
                {isActive ?
                    <Button text="Naar huiswerk" color="green" small="yes" link={`matchpage/teacher=${user.id}&student=${studentId}`}/>
                    :
                    <Button text="Aanvraag accepteren" color="green" small="yes" onClick={handleApplication}/>
                }

            </div>
            </Background>
        </>
    );
};

export default StudentField;