import React, {useContext, useEffect, useState} from 'react';
import styles from './StudentProfile.module.css';
import Background from "../../components/StylingElements/Background/Background";
import Header from "../../components/StylingElements/Header/Header";
import DisplayField from "../../components/StylingElements/DisplayField/DisplayField";
import Avatar from "../../components/Avatar/Avatar";
import robbert from "../../assets/Robbert.jpg";
import axios from "axios";
import Button from "../../components/StylingElements/Button/Button";
import BigDisplayField from "../../components/StylingElements/BigDisplayField/BigDisplayField";
import {useParams} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import NotRegistered from "../../components/NotRegistered/NotRegistered";

const StudentProfile = () => {

    const { isAuth, user } = useContext(AuthContext);

    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError]  =useState(false)

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
                console.error("Is niet gelukt joh")
            }
        }

        fetchStudent();
    }, [])

    return (
        <> {isAuth ?
            <> {student &&
            <>
                {user.authority === "ROLE_STUDENT" ? <Header text="Mijn Profiel" /> : <Header text={`Profiel van ${student.name}`}/>}
                <Background>
                    <section>
                        <h2>Gegevens</h2>
                        <DisplayField label="Naam" text={student.name}/>
                        <DisplayField label="Email" text={student.email}/>
                        <DisplayField label="Leeftijd" text={student.age}/>
                        <DisplayField label="Telefoonnummer" text={student.phoneNumber}/>
                        <DisplayField label="Woonplaats" text={student.residence}/>
                    </section>

                    <section className={styles.avatar}>
                        <h2>Profielfoto</h2>
                        <Avatar photo={robbert} big="yes"/>
                    </section>
                </Background>

                <Background>
                    <section>
                        <h2>Verzoek</h2>
                        <DisplayField label="Instrument" text={student.instrument}/>
                        <DisplayField label="Voorkeur voor lesvorm" text={student.preferenceForLessonType}/>

                        <div className={styles.request}>
                            <h4>Wat wil ik leren?</h4>
                            <BigDisplayField text={student.request}/>
                        </div>
                    </section>

                    {user.authority === "ROLE_STUDENT" &&
                    <section className={styles.navigation}>
                        <Button link={`/matchpage/teacher=${student.lesson[0].id.teacherId}&student=${user.id}`} text="Huiswerk" color="orange"
                                addStyle={styles.navigation_btn}/>
                        <Button link="/availableteachers" text="Zoek naar docenten" color="blue" small="yes"
                                addStyle={styles.navigation_btn}/>
                        <Button link="/activeapplications" text="Openstaande aanvragen" color="blue" small="yes"
                                addStyle={styles.navigation_btn}/>
                    </section>
                    }
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