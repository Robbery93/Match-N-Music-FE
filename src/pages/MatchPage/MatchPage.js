import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/StylingElements/Header/Header";
import styles from "./MatchPage.module.css"
import robbert from "../../assets/Robbert.jpg"
import floortje from "../../assets/Floortje.jpg"
import Avatar from "../../components/Avatar/Avatar";
import Background from "../../components/StylingElements/Background/Background";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/StylingElements/Button/Button";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import axios from "axios";
import {useParams} from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import {useForm} from "react-hook-form";
import Form from "../../components/FormElements/Form/Form";

const MatchPage = () => {

    const { isAuth, user } = useContext(AuthContext)
    
    // const { teacherId } = useParams();
    const { studentId } = useParams();

    const { register, handleSubmit, formState: {errors} } = useForm({mode: "onChange"});

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [student, setStudent] = useState({});
    // const [teacher, setTeacher] = useState({});  Toevoegen van foto moet er nog bij!
    const [dataCollected, toggleDataCollected] = useState(false)
    const [edit, toggleEdit] = useState(false);

    async function onFormSubmit(data) {
        console.log(data)

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
                                <h3>Huiswerk van {student.name}</h3>
                                {edit ?
                                    <Form className={styles.homework_form} onSubmit={handleSubmit(onFormSubmit)}>
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
                                    </Form>
                                    :
                                    <>
                                        <Background color="white" specificBackground={styles.homework_container__txt}>
                                            <p>{student.lesson[0].homework}</p>
                                        </Background>

                                        {user.authority === "ROLE_TEACHER" &&
                                        <Button
                                            color="orange"
                                            text="Huiswerk aanpassen"
                                            onClick={() => toggleEdit(!edit)}
                                            addStyle={styles.edit_btn}
                                        />
                                        }
                                    </>
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
