import React, {useContext, useState} from 'react';
import InputField from "../../../components/FormElements/InputField/InputField";
import skeleton from "../../../assets/skeleton.jpg";
import styles from "./RegisterTeacher.module.css"
import Button from "../../../components/StylingElements/Button/Button";
import {useForm} from "react-hook-form";
import Background from "../../../components/StylingElements/Background/Background";
import Avatar from "../../../components/Avatar/Avatar";
import Label from "../../../components/FormElements/Label/Label";
import InputTextarea from "../../../components/FormElements/InputTextarea/InputTextarea";
import InstrumentSelector from "../../../components/FormElements/InstrumentSelector/InstrumentSelector";
import {AuthContext} from "../../../context/AuthContext";
import NotRegistered from "../../../components/NotRegistered/NotRegistered";
import PreferenceSelector from "../../../components/FormElements/PreferenceSelector/PreferenceSelector";
import axios from "axios";
import {useHistory} from "react-router-dom";

const RegisterTeacher = () => {

    const { registerUser, user } = useContext(AuthContext);

    const { register, handleSubmit, formState: {errors} } = useForm({ mode: "onChange" })

    const [registerSucces, toggleRegisterSucces] = useState(false);
    const [error, toggleError] = useState(false);

    const history = useHistory();

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    async function onFormSubmit(data) {
        try {
            await axios({
                method: 'POST',
                url: "http://localhost:8080/teachers",
                data: {
                    name: data.name,
                    email: data.email,
                    age: data.age,
                    phoneNumber : data.phoneNumber,
                    residence: data.residence,
                    description: data.description,
                    experience: data.experience,
                    instrument : data.instrument,
                    preferenceForLessonType: data.preferenceForLessonType
                },
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        try {
            await axios.patch(`http://localhost:8080/teachers/linkuser/${user.username}?email=${data.email}`, axiosConfig);
        } catch (e) {
            console.log(e);
            toggleError(true);
        }

        try {
            const foundTeacher = await axios.get(`http://localhost:8080/teachers/email=${data.email}`, axiosConfig)
            toggleError(false);
            toggleRegisterSucces(true);
            setTimeout(() => history.push(`/teacherprofile/${foundTeacher.data.id}`), 2000);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        registerUser(localStorage.getItem("token"));

    }

    return (
        <>
            {user ?
                <>
                    {user.authority === "ROLE_TEACHER" ?
                        <form onSubmit={handleSubmit(onFormSubmit)}>

                            <Background>
                                <section className="inputs">
                                    <h2>Gegevens</h2>

                                    <InputField
                                        type="text"
                                        inputName="name"
                                        label="Naam"
                                        register={register}
                                        validationRules={{
                                            required: "Een naam invullen is verplicht",
                                            minLength: {
                                                value: 2,
                                                message: "Je naam moet uit minimaal 2 letters bestaan"
                                            }
                                        }}
                                        errors={errors}
                                    />

                                    <InputField
                                        type="email"
                                        inputName="email"
                                        label="Email"
                                        register={register}
                                        validationRules={{
                                            required: "Email adres mag niet leeg zijn",
                                            minLength: {value: 6, message: "Emailadres is te kort. Gebruik een \"@\""}
                                        }}
                                        errors={errors}
                                    />

                                    <InputField
                                        type="text"
                                        inputName="age"
                                        label="Leeftijd"
                                        register={register}
                                        validationRules={{
                                            required: "Je leeftijd invullen is verplicht",
                                            min: {
                                                value: 16,
                                                message: "Je moet minimaal 16 jaar oud zijn om je in te schrijven"
                                            }
                                        }}
                                        errors={errors}
                                    />

                                    <InputField
                                        type="number"
                                        inputName="phoneNumber"
                                        label="Telefoonnummer"
                                        register={register}
                                        validationRules={{
                                            required: "Je telefoonnummer is verplicht",
                                            minLength: {value: 10, message: "Vul een geldig telefoonnummer in"},
                                            maxLength: {value: 13, message: "Vul een geldig telefoonnummer in"}
                                        }}
                                        errors={errors}
                                    />

                                    <InputField
                                        type="text"
                                        inputName="residence"
                                        label="Woonplaats"
                                        register={register}
                                        validationRules={{
                                            required: "Een woonplaats invullen is verplicht."
                                        }}
                                        errors={errors}
                                    />
                                </section>

                                <aside className={styles.avatar}>
                                    <span className={styles.upload_text}>
                                        <h3>Foto uploaden:</h3>
                                        <Button
                                            small="yes"
                                            text="Kies een bestand"
                                            color="blue"
                                        />
                                    </span>

                                    <Avatar photo={skeleton} alt="Afbeelding" big="yes"/>
                                </aside>
                            </Background>

                            <Background specificBackground={styles.about}>
                                    <h2>Over jezelf:</h2>

                                <span className={styles.about_container}>
                                    <section>
                                        <div>
                                            <Label
                                                id="description"
                                                text="Stel jezelf eens voor"
                                            />
                                            <InputTextarea
                                                inputName="description"
                                                placeholder="Beschrijf jezelf in het kort!"
                                                register={register}
                                                validationRules={{
                                                    required: "Een beschrijving over jezelf is verplicht",
                                                    minLength: {
                                                        value: 20,
                                                        message: "Dat is wel heel erg kort. Probeer iets meer over jezelf te vertellen (minimaal 20 karakters)"
                                                    },
                                                    maxLength: {
                                                        value: 2000,
                                                        message: "Dit is wel iets langer dan \"kort\"... (maximaal 2000 karakters)"
                                                    }
                                                }}
                                                errors={errors}
                                            />
                                        </div>

                                        <div>
                                            <Label
                                                id="experience"
                                                text="Werkervaring"
                                            />
                                            <InputTextarea
                                                inputName="experience"
                                                placeholder="Bijvoorbeeld hoe lang je waar werkzaam bent, relevante opleidingen, enzovoorts..."
                                                register={register}
                                                validationRules={{
                                                    required: "Een beschrijving over je werkervaring is verplicht",
                                                    minLength: {
                                                        value: 20,
                                                        message: "Dat is wel heel erg kort. Probeer iets meer over je werkervaring te vertellen (minimaal 20 karakters)"
                                                    },
                                                    maxLength: {
                                                        value: 4000,
                                                        message: "Dat is wel erg veel ervaring! Kijk of je het iets compacter kan opschrijven (maximaal 4000 karakters)"
                                                    }
                                                }}
                                                errors={errors}
                                            />
                                        </div>
                                    </section>

                                    <section className={styles.about_right}>
                                        <div>
                                            <Label
                                                id="instrument"
                                                text="In welk instrument wil je les geven?"
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
                                            <PreferenceSelector register={register} />
                                        </div>

                                        <Button
                                            color="orange"
                                            type="submit"
                                            text="Registreren"
                                        />
                                    </section>
                                </span>
                        </Background>
                        </form>
                        :
                        <Background>
                            <h3>Je hebt niet de juiste rechten om deze pagina te bekijken.</h3>
                            <Button color="orange" text="Terug" onClick={() => history.goBack()}/>
                        </Background>
                    }
                    {registerSucces && <Background><h2>Je gegevens zijn opgeslagen!</h2></Background>}
                    {error && <Background><h2>Er ging ergens iets mis...</h2></Background>}
                </>
                :
                <NotRegistered/>
            }
        </>
    );
};

export default RegisterTeacher;