import React, {useContext, useState} from "react";
import axios from "axios";
import styles from "./RegisterUser.module.css"
import InputField from "../../../components/FormElements/InputField/InputField";
import {useForm} from "react-hook-form";
import Background from "../../../components/StylingElements/Background/Background";
import Label from "../../../components/FormElements/Label/Label";
import Header from "../../../components/StylingElements/Header/Header";
import Button from "../../../components/StylingElements/Button/Button";
import {useHistory} from "react-router-dom";
import ErrorText from "../../../components/ErrorText/ErrorText";
import {AuthContext} from "../../../context/AuthContext";

const RegisterUser = () => {

    const {register, handleSubmit, formState: { errors }} = useForm({mode: "onBlur"});

    const history = useHistory();

    const { registerUser } = useContext(AuthContext);

    const [registerTeacher, toggleRegisterTeacher] = useState(false);
    const [registerStudent, toggleRegisterStudent] = useState(false);
    const [registrationSuccessful, toggleRegistrationSuccessful] = useState(false);
    const [error, toggleError] = useState(false);
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
        try {
            await axios.post(`http://localhost:8080/users/student`, {
                    username: data.username,
                    password: data.password
                })

            const result = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password
            })

            registerUser(result.data.jwt);
            toggleError(false);
            toggleRegistrationSuccessful(true);
            setTimeout(() => history.push("/newstudent"), 3000);
        }
        catch (e) {
            console.error(e);
            setErrorMessage(`Het registreren is niet gelukt. Probeer het opnieuw (${e.message})`);
            toggleError(true);
        }
    }


    async function createTeacher(data) {
        try{
            await axios.post(`http://localhost:8080/users/teacher`,
                {
                    username: data.username,
                    password: data.password
                })

            const result = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password
            })

            registerUser(result.data.jwt);

            toggleError(false);
            toggleRegistrationSuccessful(true);
            setTimeout(() => history.push("/newteacher"), 3000);

        } catch (e) {
            setErrorMessage(`Het registreren is niet gelukt. Probeer het opnieuw (${e.message})`);
            toggleError(true);
        }
    }

    return (
        <>
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
            <form onSubmit={handleSubmit(createStudent)}>
                <Background specificBackground={styles.user}>
                    <section>
                        <h2 id={styles.choice_header}>Registreer je als <u>leerling</u></h2>

                        <Label
                            id="username"
                            text="Gebruikersnaam"
                        />
                        <InputField
                            label="none"
                            type="text"
                            inputName="username"
                            placeholder="Gebruikersnaam"
                            register={register}
                            validationRules={{
                                required: "Je moet een gebruikersnaam invullen",
                                minLength: { value: 3, message: "Deze gebruikersnaam is te kort, gebruik minimaal 3 karakters." }
                            }}
                            errors={errors}
                        />

                        <Label id="password" text="Wachtwoord" />
                        <small>Minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool.</small>
                        <InputField
                            label="none"
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
                            errors={errors}
                        />
                    </section>

                    <Button color="orange" type="submit" text="Registreren" />
                </Background>
            </form>
            }

            {registerTeacher &&
            <form onSubmit={handleSubmit(createTeacher)}>
                <Background specificBackground={styles.user}>
                    <section>
                        <h2 id={styles.choice_header}>Registreer je als <u>docent</u></h2>

                        <Label
                            id="username"
                            text="Gebruikersnaam"
                        />
                        <InputField
                            label="none"
                            type="text"
                            inputName="username"
                            placeholder="Gebruikersnaam"
                            register={register}
                            validationRules={{
                                required: "Je moet een gebruikersnaam invullen",
                                minLength: { value: 3, message: "Deze gebruikersnaam is te kort, gebruik minimaal 3 karakters." }
                            }}
                            errors={errors}
                        />

                        <Label id="password" text="Wachtwoord" />
                        <small>Minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool. </small>
                        <InputField
                            label="none"
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
                            errors={errors}
                        />
                    </section>

                    <Button color="orange" type="submit" text="Registreren" />
                </Background>
            </form>
            }

            {registrationSuccessful &&
            <Background specificBackground={styles.succes}>
                <h2>Het registreren is gelukt!</h2>
                <p> Vul op de volgende pagina de rest van je gegevens in. <br/> Je wordt automatisch doorgestuurd.</p>
            </Background>
            }
            {error &&
            <Background>
                <ErrorText errorMessage={errorMessage} />
            </Background>}

        </>
    )
}

export default RegisterUser;