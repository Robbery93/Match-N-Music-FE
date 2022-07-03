import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import axios from "axios";

import styles from './StudentProfile.module.css';
import robbert from "../../assets/Robbert.jpg";

import Background from "../../components/StylingElements/Background/Background";
import Header from "../../components/StylingElements/Header/Header";
import DisplayField from "../../components/StylingElements/DisplayField/DisplayField";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/StylingElements/Button/Button";
import BigDisplayField from "../../components/StylingElements/BigDisplayField/BigDisplayField";
import NotRegistered from "../../components/NotRegistered/NotRegistered";

const StudentProfile = () => {

    const { isAuth, user } = useContext(AuthContext);

    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);
    const [edit, toggleEdit] = useState(false);

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    useEffect(() => {
        async function fetchStudent(){
            try {
                const {data} = await axios.get(`http://localhost:8080/students/${id}`, axiosConfig)
                setStudent(data);
                toggleLoading(false);
            } catch (e) {
                toggleLoading(false);
                toggleError(true);
                console.error("Is niet gelukt joh (StudentProfile)")
            }
        }

        fetchStudent();
    }, [])

    return (
        <> {isAuth ?
            <> {student &&
            <>
                {user.authority === "ROLE_STUDENT" ? <Header text="Mijn profiel" /> : <Header text={`Profiel van ${student.name}`}/>}
                <Background>
                    <section>
                        <h2>Gegevens</h2>
                        {!edit ?
                            <>
                                <DisplayField label="Naam" text={student.name}/>
                                <DisplayField label="Email" text={student.email}/>
                                <DisplayField label="Leeftijd" text={student.age}/>
                                <DisplayField label="Telefoonnummer" text={student.phoneNumber}/>
                                <DisplayField label="Woonplaats" text={student.residence}/>
                            </>
                            :
                            <>
                                <p>hallo!</p>
                            </>
                        }

                    </section>

                    <section className={styles.avatar}>
                        <h2>Profielfoto</h2>
                        <Avatar photo={robbert} big="yes"/>
                    </section>
                </Background>

                <Background specificBackground={styles.about}>
                    <h2>Verzoek</h2>
                    <span className={styles.about_container}>
                        <section>
                            <DisplayField label="Instrument" text={student.instrument}/>
                            <DisplayField label="Voorkeur voor lesvorm" text={student.preferenceForLessonType}/>

                            <div className={styles.request}>
                                <h4>Wat wil ik leren?</h4>
                                <BigDisplayField text={student.request}/>
                            </div>
                        </section>

                        {user.authority === "ROLE_STUDENT" &&
                        <section className={styles.navigation}>
                            <div>
                                <Button link={`/matchpage/teacher=${student.lesson[0].id.teacherId}&student=${user.id}`} text="Huiswerk" color="orange"
                                        addStyle={styles.navigation_btn}/>
                                <Button link="/availableteachers" text="Zoek naar docenten" color="blue" small="yes"
                                        addStyle={styles.navigation_btn}/>
                                <Button link="/activeapplications" text="Openstaande aanvragen" color="blue" small="yes"
                                        addStyle={styles.navigation_btn}/>
                            </div>
                            <Button text="Gegevens wijzigen" color="blue" small="yes" onClick={() => toggleEdit(true)}
                                    addStyle={styles.navigation_btn}/>
                        </section>
                        }
                    </span>
                </Background>

                {loading && <Background><p>De gegevens worden geladen</p></Background>}
                {error && <Background><p>Whoops, er ging iets mis met het ophalen van de data</p></Background>}
            </>
            }
            </>
            :
            <NotRegistered/>
        }
        </>
    );
};

export default StudentProfile;