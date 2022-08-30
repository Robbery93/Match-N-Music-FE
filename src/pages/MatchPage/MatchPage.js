import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/StylingElements/Header/Header";
import styles from "./MatchPage.module.css";
import Avatar from "../../components/Avatar/Avatar";
import Background from "../../components/StylingElements/Background/Background";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/StylingElements/Button/Button";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import {useForm} from "react-hook-form";

const MatchPage = () => {

    const { isAuth, user } = useContext(AuthContext)
    const { teacherId } = useParams();
    const { studentId } = useParams();
    const { register, handleSubmit, formState: {errors} } = useForm({mode: "onChange"});

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [student, setStudent] = useState({});
    const [teacher, setTeacher] = useState({});
    const [homework, setHomework] = useState(``);
    const [dataCollected, toggleDataCollected] = useState(false)
    const [edit, toggleEdit] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try{
                const studentData = await axios.get(`http://localhost:8080/students/${studentId}`, axiosConfig);
                setStudent(studentData.data);
                setHomework(studentData.data.lesson[0].homework);


                const teacherData = await axios.get(`http://localhost:8080/teachers/${teacherId}`, axiosConfig);
                setTeacher(teacherData.data);

                toggleDataCollected(true);
            } catch (e) {
                console.error("Ophalen van data is niet gelukt")
            }
        }

        fetchData();
    }, [dataCollected])

    async function updateHomework(data) {
        try {
            await axios.patch(`http://localhost:8080/teachers/${user.id}/update_homework?student_id=${studentId}`, {
                homework: data.homework
            }, axiosConfig);
            toggleEdit(false);
            location.reload();
        }
        catch (e) {
            console.error("Update van huiswerk is niet gelukt")
        }

    }

    async function unsubscribe() {
        if(confirm("Weet je zeker dat je deze les wil beëindigen?")) {

            if(user.authority === "ROLE_TEACHER") {
                try {
                    await axios.delete(`http://localhost:8080/teachers/${user.id}/unsubscribe?student_id=${student.id}`, axiosConfig);
                    alert("De les is beëindigd");
                    toggleDataCollected(false);
                } catch (e) {
                    console.error("Niet gelukt");
                }
            }
            if(user.authority === "ROLE_STUDENT") {
                try {
                    await axios.delete(`http://localhost:8080/students/${user.id}/unsubscribe?teacher_id=${student.id}`, axiosConfig);
                    alert("Je hebt je uitgeschreven van deze les");
                    toggleDataCollected(false);
                } catch (e) {
                    console.error("Niet gelukt");
                }
            }
        }
    }

    return (
        <>
            {isAuth ?
                <>
                    {dataCollected ?
                    <>
                        <Header text="Match pagina" />
                        <Background specificBackground={styles.matchpage}>
                            <div className={styles.avatars}>
                                <div>
                                    <Avatar photo={`http://localhost:8080/files/download/${student.photo}`}
                                            alt="Foto van leering"
                                    />
                                    <p>{student.name}</p>
                                </div>
                                <div>
                                    <Avatar photo={`http://localhost:8080/files/download/${teacher.photo}`}
                                            alt="Foto van docent"
                                    />
                                    <p>{teacher.name}</p>
                                </div>
                            </div>

                            <div className={styles.homework_container}>
                                <h3>Huiswerk van {student.name}</h3>
                                {edit ?
                                    <form className={styles.homework_form} onSubmit={handleSubmit(updateHomework)}>
                                        <textarea
                                            className={styles.homework_input}
                                            placeholder={student.lesson[0].homework}
                                            id="homework"
                                            {...register("homework", {
                                                required: "Geef het huiswerk op",
                                                minLength: {
                                                    value: 30,
                                                    message: "Vul meer tekst is. Zo is het duidelijker voor de leerling wat hij/zij moet leren voor de volgende keer"
                                                },
                                                maxLength: {
                                                    value: 4000,
                                                    message: "Dit is een hoop huiswerk! Probeer concreter te zijn..."
                                                }
                                            })}/>
                                        <ErrorMessage errors={errors}
                                                      name="homework"
                                                      render={({message}) => <p className={styles.error}>{message}</p>} />

                                        <span className={styles.buttons}>
                                            <Button
                                                color="orange"
                                                text="Annuleren"
                                                onClick={() => toggleEdit(!edit)}
                                            />

                                            <Button
                                                addStyle={styles.confirm_btn}
                                                color="green"
                                                type="submit"
                                                text="Bevestigen"
                                            />
                                        </span>
                                    </form>
                                    :
                                    <>
                                        <Background color="white" specificBackground={styles.homework_container__txt}>
                                            <p>{homework}</p>
                                        </Background>

                                        {user.authority === "ROLE_STUDENT" &&
                                        <Button
                                            color="blue"
                                            text="Uitschrijven"
                                            onClick={unsubscribe}
                                            addStyle={styles.unsub_btn}
                                        />
                                        }

                                        {user.authority === "ROLE_TEACHER" &&
                                        <span className={styles.buttons}>
                                            <Button
                                                color="blue"
                                                text="Les beëindigen"
                                                onClick={unsubscribe}
                                            />
                                            <Button
                                                color="orange"
                                                text="Huiswerk aanpassen"
                                                onClick={() => toggleEdit(!edit)}
                                                addStyle={styles.edit_btn}
                                            />
                                        </span>
                                        }
                                    </>
                                }
                            </div>
                        </Background>
                    </> :
                            <Background>
                                <p>Deze les bestaat niet (meer). Keer terug de <Link to="">homepagina</Link></p>
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
