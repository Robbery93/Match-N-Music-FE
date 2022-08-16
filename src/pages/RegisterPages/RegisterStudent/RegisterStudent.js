import React, {useContext, useEffect, useState} from 'react';
import styles from './RegisterStudent.module.css';
import InputField from "../../../components/FormElements/InputField/InputField";
import Button from "../../../components/StylingElements/Button/Button";
import {useForm} from "react-hook-form";
import Label from "../../../components/FormElements/Label/Label";
import Background from "../../../components/StylingElements/Background/Background";
import InputTextarea from "../../../components/FormElements/InputTextarea/InputTextarea";
import InstrumentSelector from "../../../components/FormElements/InstrumentSelector/InstrumentSelector";
import Avatar from "../../../components/Avatar/Avatar";
import {AuthContext} from "../../../context/AuthContext";
import NotRegistered from "../../../components/NotRegistered/NotRegistered";
import {useHistory} from "react-router-dom";
import PreferenceSelector from "../../../components/FormElements/PreferenceSelector/PreferenceSelector";
import axios from "axios";
import Header from "../../../components/StylingElements/Header/Header";

const RegisterStudent = () => {

    const { user, registerUser } = useContext(AuthContext);

    const history = useHistory();

    const { register, handleSubmit, formState: {errors} } = useForm({ mode: "onChange" });

    const [file, setFile] = useState({});
    const [fileName, setFileName] = useState("");

    const [registerSucces, toggleRegisterSucces] = useState(false);
    const [error, toggleError] = useState(false)

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const storeFile = event => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }


    async function onFormSubmit(data) {
        try {
            await axios.post("http://localhost:8080/students", {
                name: data.name,
                email: data.email,
                age: data.age,
                phoneNumber: data.phoneNumber,
                residence: data.residence,
                instrument: data.instrument,
                request: data.request,
                preferenceForLessonType: data.preferenceForLessonType,
                photo: fileName
            }, axiosConfig);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        try {
            await axios.patch(`http://localhost:8080/students/linkuser/${user.username}?email=${data.email}`,
                axiosConfig);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        try {
            const foundStudent = await axios.get(`http://localhost:8080/students/email=${data.email}`, axiosConfig);
            const studentId = foundStudent.data.id;

            await handleUpload(studentId);
            toggleRegisterSucces(true);
            setTimeout(() => history.push(`/studentprofile/${foundStudent.data.id}`), 2000);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

       registerUser(localStorage.getItem("token"));
    }

    async function handleUpload(id) {
        let formdata = new FormData();
        formdata.append('file', file);

        try {
            await axios.post(`http://localhost:8080/students/${id}/upload`,
                formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }}
            )
        } catch (e) {
            console.error(`${e.message}`)
        }
    }

    useEffect(() => {
        console.log(file)
    } ,[file])

    return (
        <> {user ?
                <> {user.authority === "ROLE_STUDENT" ?
                        <>
                            <Header text="Registratie pagina" />
                            <form onSubmit={handleSubmit(onFormSubmit)} encType="multipart/form-data">
                                <Background>
                                    <section>
                                        <h2>Gegevens</h2>

                                        <InputField
                                            label="Naam"
                                            type="text"
                                            inputName="name"
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
                                            label="Email"
                                            type="email"
                                            inputName="email"
                                            register={register}
                                            validationRules={{
                                                required: "Email adres mag niet leeg zijn",
                                                minLength: {
                                                    value: 6,
                                                    message: "Emailadres is te kort. Gebruik een \"@\""
                                                }
                                            }}
                                            errors={errors}
                                        />


                                        <InputField
                                            label="Leeftijd"
                                            type="number"
                                            inputName="age"
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
                                            label="Telefoonnummer"
                                            type="number"
                                            inputName="phoneNumber"
                                            register={register}
                                            validationRules={{
                                                required: "Je telefoonnummer is verplicht",
                                                minLength: {value: 10, message: "Vul een geldig telefoonnummer in"},
                                                maxLength: {value: 13, message: "Vul een geldig telefoonnummer in"}
                                            }}
                                            placeholder="06******** of +316********"
                                            errors={errors}
                                        />


                                        <InputField
                                            label="Woonplaats"
                                            type="text"
                                            inputName="residence"
                                            register={register}
                                            validationRules={{
                                                required: "Een woonplaats invullen is verplicht."
                                            }}
                                            placeholder="Woonplaats"
                                            errors={errors}
                                        />
                                    </section>

                                    <aside className={styles.avatar}>
                                        <span className={styles.upload_text}>
                                            <Label text="Foto uploaden"/>
                                            <label className={styles.file_label}>
                                            <input
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={(e) => storeFile(e)}/>
                                                Kies een foto
                                            </label>
                                            {file.name && <>
                                                <p>Het gekozen bestand:</p>
                                                <p>{file.name}</p>
                                            </>}
                                        </span>

                                        <Avatar photo="" alt="Afbeelding" big="yes"/>


                                    </aside>

                                </Background>

                                <Background specificBackground={styles.request}>
                                    <h2>Je verzoek</h2>

                                    <span className={styles.request_container}>
                                        <section>
                                            <div>
                                                <Label id="instrument" text="Instrument"/>
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
                                                    errors={errors}
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
                                    </span>

                                </Background>
                            </form>

                            {registerSucces && <Background><h2>Je gegevens zijn opgeslagen!</h2></Background>}
                            {error && <Background><h2>Er ging ergens iets mis...</h2></Background>}
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