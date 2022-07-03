import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import axios from "axios";

import styles from "./TeacherProfile.module.css";
import robbert from "../../assets/Robbert.jpg";

import Header from "../../components/StylingElements/Header/Header";
import Background from "../../components/StylingElements/Background/Background";
import DisplayField from "../../components/StylingElements/DisplayField/DisplayField";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/StylingElements/Button/Button";
import BigDisplayField from "../../components/StylingElements/BigDisplayField/BigDisplayField";
import NotRegistered from "../../components/NotRegistered/NotRegistered";

const TeacherProfile = () => {

    const { isAuth, user } = useContext(AuthContext);

    const { id } = useParams();

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [teacher, setTeacher] = useState({});
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false)

    useEffect(() => {
        async function fetchTeacher() {
            try {
                const {data} = await axios.get(`http://localhost:8080/teachers/${id}`, axiosConfig)
                setTeacher(data);
                toggleLoading(false);
            } catch (e) {
                toggleError(true);
                toggleLoading(false);
                console.error(e);
            }
        }

        fetchTeacher();
    } , [])

    return (
        <> {isAuth ?
            <> {teacher &&
            <>
                {user.authority === "ROLE_TEACHER" ? <Header text="Mijn profiel" /> : <Header text={`Profiel van ${teacher.name}`} />}
                <Background>
                    <section>
                        <h2>Gegevens</h2>
                        <DisplayField label="Naam" text={teacher.name}/>
                        <DisplayField label="Email" text={teacher.email}/>
                        <DisplayField label="Leeftijd" text={teacher.age}/>
                        <DisplayField label="Telefoonnummer" text={teacher.phoneNumber}/>
                        <DisplayField label="Woonplaats" text={teacher.residence}/>
                    </section>

                    <section className={styles.avatar}>
                        <h2>Profielfoto</h2>
                        <Avatar photo={robbert} big="yes" />
                    </section>
                </Background>

                <Background specificBackground={styles.about}>
                        <h2>Over mij</h2>
                    <span className={styles.about_container}>
                        <section>
                            <DisplayField label="Instrument" text={teacher.instrument}/>
                            <DisplayField label="Voorkeur voor lesvorm" text={teacher.preferenceForLessonType}/>
                            <div className={styles.bigtxt}>
                                <h4>Iets over mij</h4>
                                <BigDisplayField text={teacher.description} />
                                <h4>Mijn werkervaring</h4>
                                <BigDisplayField text={teacher.experience} />
                            </div>
                        </section>

                        {user.authority === "ROLE_TEACHER" &&
                        <section className={styles.navigation}>
                            <div>
                                <Button link="/activelessons" text="Mijn leerlingen" color="orange" small="yes"
                                        addStyle={styles.navigation_btn}/>
                                <Button link="/studentapplications" text="Nieuwe aanvragen" color="orange" small="yes"
                                        addStyle={styles.navigation_btn}/>
                            </div>
                            <Button text="Gegevens wijzigen" color="blue" small="yes" addStyle={styles.navigation_btn}
                            />
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
            <NotRegistered />
            }
        </>
    );
};

export default TeacherProfile;