import React, {useContext, useEffect, useState} from 'react';
import styles from './StudentProfile.module.css';
import Background from "../../components/StylingElements/Background/Background";
import Header from "../../components/StylingElements/Header/Header";
import DisplayField from "../../components/StylingElements/DisplayField/DisplayField";
import Avatar from "../../components/Avatar/Avatar";
import robbert from "../../assets/Robbert.jpg";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/StylingElements/Button/Button";

const StudentProfile = () => {

    const [student, setStudent] = useState({});

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const axiosConfig = { headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }};

        async function fetchData(){
            try {
                const {data} = await axios.get(`http://localhost:8080/students/${user.id}`, axiosConfig)
                setStudent(data);
            } catch (e) {
                console.error("Is niet gelukt joh")
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth"})
    }, [])

    return (
        <> {student ?
            <>
                <Header text="Je profiel"/>
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
                        <Avatar photo={robbert}/>
                    </section>
                </Background>

                <Background>
                    <section>
                        <h2>Je verzoek</h2>
                        <DisplayField label="Instrument" text={student.instrument}/>
                        <DisplayField label="Voorkeur voor lesvorm" text={student.preferenceForLessonType}/>
                        <div className={styles.request}>
                            <h3>Wat wil ik leren?</h3>
                            <div className={styles.request_container}>
                                <p>{student.request}</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.navigation}>
                        <Button link="/matchpage" text="Huiswerk" color="blue" small="yes" addStyle={styles.navigation_btn} />
                        <Button link="/availableteachers" text="Zoek naar docenten" color="blue" small="yes" addStyle={styles.navigation_btn} />
                        <Button link="/activeapplications" text="Openstaande aanvragen" color="blue" small="yes" addStyle={styles.navigation_btn} />
                    </section>
                </Background>
            </>
            :
            <Background>
                <p>De gegevens worden geladen</p>
            </Background>
        }
        </>
    );
};

export default StudentProfile;