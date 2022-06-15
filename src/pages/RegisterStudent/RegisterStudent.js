import React, {useContext, useState} from 'react';
import styles from './RegisterStudent.module.css';
import InputField from "../../components/FormElements/InputField/InputField";
import skeleton from "../../assets/skeleton.jpg";
import Button from "../../components/StylingElements/Button/Button";
import {useForm} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Label from "../../components/FormElements/Label/Label";
import Background from "../../components/StylingElements/Background/Background";
import InputTextarea from "../../components/FormElements/InputTextarea/InputTextarea";
import InstrumentSelector from "../../components/FormElements/InstrumentSelector/InstrumentSelector";
import Form from "../../components/FormElements/Form/Form";
import Avatar from "../../components/Avatar/Avatar";
import {AuthContext} from "../../context/AuthContext";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import {useHistory} from "react-router-dom";
import PreferenceSelector from "../../components/FormElements/PreferenceSelector/PreferenceSelector";
import axios from "axios";
import Header from "../../components/StylingElements/Header/Header";

const RegisterStudent = () => {

    const { user, registerUser } = useContext(AuthContext);

    const history = useHistory();

    const { register, handleSubmit, formState: {errors} } = useForm({ mode: "onChange" });

    const [registerSucces, toggleRegisterSucces] = useState(false);

    async function onFormSubmit(data) {

        console.log(`Ingevulde data:
        Naam: ${data.name}
        Email: ${data.email}
        Leeftijd: ${data.age}
        Woonplaats: ${data.residence}
        Telefoonnummer: ${data.phoneNumber}
        Instrument: ${data.instrument}
        Verzoek: ${data.request}
        Voorkeur voor lesvorm: ${data.preferenceForLessonType}`);

        const axiosConfig = { headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }};

        try {
            await axios.post("http://localhost:8080/students", {
                name: data.name,
                email: data.email,
                age: data.age,
                residence: data.residence,
                phoneNumber : data.phoneNumber,
                instrument : data.instrument,
                request : data.request,
                preferenceForLessonType: data.preferenceForLessonType
            }, axiosConfig);
        } catch (e) {
            console.error(e);
            console.error("In invullen van data is niet gelukt.");
        }

        try {
            await axios.patch(`http://localhost:8080/students/linkuser/${user.username}?email=${data.email}`,
                axiosConfig)
            toggleRegisterSucces(true);
        } catch (e) {
            console.log(e);
            console.error("Het linken aan User is niet gelukt");
        }

        registerUser(localStorage.getItem("token"), user.username);
        setTimeout(() => history.push("/profile"), 3000);
    }

    return (
        <>
            {user ?
                <>
                    {user.authority === "ROLE_STUDENT" ?
                        <>
                            <Header text="Registratie pagina" />
                            <Form onSubmit={handleSubmit(onFormSubmit)}>
                                <Background>
                                    <section>
                                        <h2>Gegevens</h2>

                                        <InputField
                                            type="text"
                                            inputName="name"
                                            placeholder="Naam"
                                            register={register}
                                            validationRules={{
                                                required: "Een naam invullen is verplicht",
                                                minLength: {
                                                    value: 2,
                                                    message: "Je naam moet uit minimaal 2 letters bestaan"
                                                }
                                            }}
                                        />
                                        <ErrorMessage errors={errors}
                                                      name="name"
                                                      render={({message}) => <p className={styles.error}>{message}</p>}
                                        />

                                        <InputField
                                            type="email"
                                            inputName="email"
                                            placeholder="Email"
                                            register={register}
                                            validationRules={{
                                                required: "Email adres mag niet leeg zijn",
                                                minLength: {
                                                    value: 6,
                                                    message: "Emailadres is te kort. Gebruik een \"@\""
                                                }
                                            }}
                                        />
                                        <ErrorMessage errors={errors}
                                                      name="email"
                                                      render={({message}) => <p className={styles.error}>{message}</p>}
                                        />

                                        <InputField
                                            type="number"
                                            inputName="age"
                                            placeholder="Leeftijd"
                                            register={register}
                                            validationRules={{
                                                required: "Je leeftijd invullen is verplicht",
                                                min: {
                                                    value: 16,
                                                    message: "Je moet minimaal 16 jaar oud zijn om je in te schrijven"
                                                }
                                            }}
                                        />
                                        <ErrorMessage errors={errors}
                                                      name="age"
                                                      render={({message}) => <p className={styles.error}>{message}</p>}
                                        />

                                        <InputField
                                            type="number"
                                            inputName="phoneNumber"
                                            register={register}
                                            validationRules={{
                                                required: "Je telefoonnummer is verplicht",
                                                minLength: {value: 10, message: "Vul een geldig telefoonnummer in"},
                                                maxLength: {value: 13, message: "Vul een geldig telefoonnummer in"}
                                            }}
                                            placeholder="Telefoonnummer bv: 06-12345678"
                                        />
                                        <ErrorMessage errors={errors}
                                                      name="phoneNumber"
                                                      render={({message}) => <p className={styles.error}>{message}</p>}
                                        />

                                        <InputField
                                            type="text"
                                            inputName="residence"
                                            register={register}
                                            validationRules={{
                                                required: "Een woonplaats invullen is verplicht."
                                            }}
                                            placeholder="Woonplaats"
                                        />
                                        <ErrorMessage errors={errors}
                                                      name="residence"
                                                      render={({message}) => <p className={styles.error}>{message}</p>}
                                        />
                                    </section>

                                    <aside className={styles.avatar}>
                                        <span className={styles.upload_text}>
                                            <Label text="Foto uploaden"/>
                                            <Button
                                                color="blue"
                                                text="Kies een bestand"
                                                small="yes"
                                            />
                                        </span>

                                        <Avatar photo={skeleton} alt="Afbeelding"/>
                                    </aside>

                                </Background>

                                <Background>
                                    <section>
                                        <h2>Je verzoek</h2>

                                        <div>
                                            <Label
                                                id="instrument"
                                                text="Instrument"
                                            />
                                            <InstrumentSelector
                                                inputName="instrument"
                                                register={register}
                                                validationRules={{
                                                    required: true
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <Label
                                                id="request"
                                                text="Wat wil je leren?"
                                            />
                                            <InputTextarea
                                                placeholder="Wees zo duidelijk mogelijk!"
                                                inputName="request"
                                                register={register}
                                                validationRules={{
                                                    required: "Een beschrijving van wat je wil leren is verplicht",
                                                    minLength: {
                                                        value: 20,
                                                        message: "Vul wat meer tekst in. Zo is het duidelijker voor de docent wat je wil leren"
                                                    },
                                                    maxLength: {
                                                        value: 4000,
                                                        message: "Ik denk dat je wel duidelijk genoeg ben geweest. Probeer het in iets minder woorden"
                                                    }
                                                }}
                                            />
                                            <ErrorMessage errors={errors}
                                                          name="request"
                                                          render={({message}) => <p className={styles.error}>{message}</p>}
                                            />
                                        </div>
                                    </section>

                                    <section className={styles.preference}>
                                        <PreferenceSelector register={register} />


                                        <Button
                                            color="orange"
                                            type="submit"
                                            text="Registreren"
                                        />
                                    </section>

                                </Background>
                            </Form>
                            {registerSucces &&
                            <Background>
                                <h2>Je gegevens zijn opgeslagen!</h2>
                            </Background>
                            }
                        </>
                        :
                        <Background>
                            <h3>Je hebt niet de juiste rechten om deze pagina te bekijken.</h3>
                            <Button color="orange" text="Terug" onClick={() => history.goBack()} />
                        </Background>
                    }
                </>
                :
                <NotRegistered />
            }
        </>
    );
};

export default RegisterStudent;