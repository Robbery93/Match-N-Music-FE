import React, {useState} from "react";
import axios from "axios";
import styles from "./RegisterUser.module.css"
import InputField from "../../components/FormComponents/InputField/InputField";
import {useForm} from "react-hook-form";
import Form from "../../components/FormComponents/Form/Form";
import Background from "../../components/StylingComponents/Background/Background";
import Label from "../../components/FormComponents/Label/Label";
import {ErrorMessage} from "@hookform/error-message";
import PageWrapper from "../../components/StylingComponents/PageWrapper/PageWrapper";
import Header from "../../components/StylingComponents/Header/Header";
import Button from "../../components/Button/Button";
import {useHistory} from "react-router-dom";

const RegisterUser = () => {

    const {register, handleSubmit, formState: { errors }} = useForm({mode: "onChange"});
    const history = useHistory();



    const [registerTeacher, toggleRegisterTeacher] = useState(false);
    const [registerStudent, toggleRegisterStudent] = useState(false);
    const [registrationSuccessful, toggleRegistrationSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const openStudentRegistration = () => {
        toggleRegisterStudent(!registerStudent);
        toggleRegisterTeacher(false);
    }

    const openTeacherRegistration = () => {
        toggleRegisterTeacher(!registerTeacher);
        toggleRegisterStudent(false);
    }

    async function createStudent(data) {
        console.log(data)

        try {
            await axios.post(`http://localhost:8080/users/student`,
                {
                    username: data.usrname,
                    password: data.password
                })

            toggleRegistrationSuccessful(true);

            setTimeout(() => history.push("/newstudent"), 5000);
        }
        catch (e) {
            console.error(e);
            setErrorMessage(`Het registreren is niet gelukt. Probeer het opnieuw (${e.message})`);
        }
    }

    async function createTeacher(data) {
        await axios.post(`http://localhost:8080/users/teacher`,
            {
                username: data.username,
                password: data.password
            })
    }

    return (
        <PageWrapper>
            <Header text="Registratie pagina" />

            <Background specificBackground={styles.register_background}>
                <h3>Als wat wil je je registeren?</h3>

                <span>
                    <Button
                        color="orange"
                        text="Leerling"
                        onClick={openStudentRegistration}
                    />
                    <Button
                        color="orange"
                        text="Docent"
                        onClick={openTeacherRegistration}
                    />
                </span>
            </Background>

            {registerStudent &&
            <Form onSubmit={handleSubmit(createStudent)}>
                <Background specificBackground={styles.user}>
                    <section>
                        <h2 id={styles.choice_header}>Registreer je als <u>leerling</u></h2>

                        <Label
                            id="username"
                            text="Gebruikersnaam"
                        />
                        <InputField
                            type="text"
                            inputName="username"
                            placeholder="Gebruikersnaam"
                            register={register}
                            validationRules={{
                                required: "Je moet een gebruikersnaam invullen",
                                minLength: { value: 4, message: "Deze gebruikersnaam is te kort, gebruik minimaal 4 karakters." }
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="username"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />

                        <Label id="password" text="Wachtwoord" />
                        <small>Minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool. </small>
                        <InputField
                            type="password"
                            inputName="password"
                            placeholder="Wachtwoord"
                            register={register}
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Je moet een wachtwoord invullen."
                                },
                                minLength: {
                                    value: 8,
                                    message: "Gebruik minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool."
                                }
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="password"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />
                    </section>

                    <Button color="orange" type="submit" text="Registreren" />
                </Background>
            </Form>
            }

            {registerTeacher &&
            <Form onSubmit={handleSubmit(createTeacher)}>
                <Background specificBackground={styles.user}>
                    <section>
                        <h2 id={styles.choice_header}>Registreer je als <u>docent</u></h2>

                        <Label
                            id="username"
                            text="Gebruikersnaam"
                        />
                        <InputField
                            type="text"
                            inputName="username"
                            placeholder="Gebruikersnaam"
                            register={register}
                            validationRules={{
                                required: "Je moet een gebruikersnaam invullen",
                                minLength: { value: 4, message: "Deze gebruikersnaam is te kort, gebruik minimaal 4 karakters." }
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="username"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />

                        <Label id="password" text="Wachtwoord" />
                        <small>Minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool. </small>
                        <InputField
                            type="password"
                            inputName="password"
                            placeholder="Wachtwoord"
                            register={register}
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Je moet een wachtwoord invullen."
                                },
                                minLength: {
                                    value: 8,
                                    message: "Gebruik minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool."
                                }
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="password"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />
                    </section>

                    <Button color="orange" type="submit" text="Registreren" />
                </Background>
            </Form>
            }

            {registrationSuccessful &&
            <Background specificBackground={styles.succes}>
                <h2>Het registreren is gelukt!</h2>
                <p> Vul op de volgende pagina de rest van je gegevens in. <br/> Je wordt automatisch doorgestuurd.</p>
            </Background>
            }
            {errorMessage &&
            <Background>
                <p className={styles.error}>{errorMessage}</p>
            </Background>}

        </PageWrapper>
    )
}

export default RegisterUser;