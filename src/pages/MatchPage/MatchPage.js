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
import {useParams} from "react-router-dom";

const MatchPage = () => {

    const { isAuth, user } = useContext(AuthContext)
    
    // const { teacherId } = useParams();
    const { studentId } = useParams();

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [student, setStudent] = useState({});
    // const [teacher, setTeacher] = useState({});  Toevoegen van foto moet er nog bij!
    const [dataCollected, toggleDataCollected] = useState(false)

    
    useEffect(() => {
        async function fetchData() {
            try{
                const studentData = await axios.get(`http://localhost:8080/students/${studentId}`, axiosConfig);
                setStudent(studentData.data);

                // const teacherData = await axios.get(`http://localhost:8080/teachers/${teacherId}`, axiosConfig);
                // setTeacher(teacherData.data);
                // console.log(teacherData.data);

                toggleDataCollected(true);
            } catch (e) {
                console.error("Ophalen van data is niet gelukt")
            }
        }

        fetchData();
    }, [])

    return (
        <>
            {isAuth ?
                <>
                    {dataCollected &&
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
                                    homework={student.lesson[0].homework}
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
                    }
                </>
                :
                <NotRegistered />
            }
        </>
    );
};

export default MatchPage;
