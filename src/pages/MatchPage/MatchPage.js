import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/StylingElements/Header/Header";
import styles from "./MatchPage.module.css"
import robbert from "../../assets/Robbert.jpg"
import floortje from "../../assets/Floortje.jpg"
import Avatar from "../../components/Avatar/Avatar";
import HomeworkField from "../../components/HomeworkField/HomeworkField";
import Background from "../../components/StylingElements/Background/Background";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/StylingElements/Button/Button";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import axios from "axios";

const MatchPage = () => {

    const { user } = useContext(AuthContext)

    const [student, setStudent] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const axiosConfig = { headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }};
            try{
            const result = await axios.get(`http://localhost:8080/students/${user.id}`, axiosConfig);
                setStudent(result.data);
        } catch (e) {
                console.error("Ophalen van data is niet gelukt")
            }
        }

        fetchData();
    }, [])

    return (
        <>
            {user ?
                <>
                    { student !== null ?
                    <>
                        <Header text="Match pagina" />
                        <Background specificBackground={styles.matchpage}>
                            <div className={styles.avatars}>
                                <Avatar photo={floortje}
                                        alt="Foto van leering"
                                />
                                <Avatar photo={robbert}
                                        alt="Foto van docent"
                                />
                            </div>

                            <div className={styles.homework_container}>
                                <HomeworkField
                                    name={student.name}
                                    homework={student.lessons[0] ? student.lessons[0].homework : "Er is nog geen huiswerk opgegeven"}
                                />
                                {user.authority === "ROLE_TEACHER" &&
                                <Button
                                    id={styles.edit_btn}
                                    color="orange"
                                    text="Huiswerk aanpassen" />
                                }
                            </div>
                        </Background>
                    </>
                        :
                        <Background>
                            <p>Ophalen van data is nog niet gelukt.</p>
                        </Background>
                    }
                </>
                :
                <NotRegistered />
            }
        </>
    );
};

export default MatchPage;
