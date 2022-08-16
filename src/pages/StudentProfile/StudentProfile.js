import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import axios from "axios";

import styles from './StudentProfile.module.css';

import Background from "../../components/StylingElements/Background/Background";
import Header from "../../components/StylingElements/Header/Header";
import DisplayField from "../../components/StylingElements/DisplayField/DisplayField";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/StylingElements/Button/Button";
import BigDisplayField from "../../components/StylingElements/BigDisplayField/BigDisplayField";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import InputField from "../../components/FormElements/InputField/InputField";
import {useForm} from "react-hook-form";
import InputTextarea from "../../components/FormElements/InputTextarea/InputTextarea";

const StudentProfile = () => {

    const { isAuth, user } = useContext(AuthContext);

    const { id } = useParams();

    const { register, handleSubmit, formState: {errors} } = useForm({mode: "onBlur"});

    const [student, setStudent] = useState(null);
    const [file, setFile] = useState({});
    const [fileName, setFileName] = useState("");

    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);
    const [editDetails, toggleEditDetails] = useState(false);
    const [editRequest, toggleEditRequest] = useState(false);

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const storeFile = event => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    useEffect(() => {
        async function fetchStudent(){
            try {
                const {data} = await axios.get(`http://localhost:8080/students/${id}`, axiosConfig)
                setStudent(data);
                toggleLoading(false);
            } catch (e) {
                toggleLoading(false);
                toggleError(true);
                console.error("Is niet gelukt joh (StudentProfile)")
            }
        }

        fetchStudent();
    }, [])

    async function updateDetails(data) {
        try {
            await axios.patch(`http://localhost:8080/students/${user.id}`, {
                name: data.name,
                email: data.email,
                age: data.age,
                phoneNumber: data.phoneNumber,
                residence: data.residence,
            }, axiosConfig)

            console.log("Update is gelukt!")
            toggleEditDetails(false);

            if(file) {
                await updateAvatar();
                await axios.patch(`http://localhost:8080/students/${user.id}`, {
                    photo: fileName
                }, axiosConfig)
            }


            location.reload();
        } catch (e) {
            console.log("update niet gelukt")
        }
    }

    async function updateRequest(data) {
        try {
            await axios.patch(`http://localhost:8080/students/${user.id}`, {
                request: data.request
            }, axiosConfig)

            console.log("Update is gelukt!")
            toggleEditRequest(false);
            location.reload();
        } catch (e) {
            console.error("Update is niet gelukt")
        }
    }

    async function updateAvatar() {
        let formdata = new FormData();
        formdata.append('file', file)

        try {
            await axios.post(`http://localhost:8080/students/${user.id}/upload`,
                formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }}
            )
        } catch (e) {
            console.error("Avatar update niet gelukt")
        }
    }

    return (
        <> {isAuth ?
            <> {student &&
                <>
                    {user.authority === "ROLE_STUDENT" ? <Header text="Mijn profiel" /> : <Header text={`Profiel van ${student.name}`}/>}
                    <Background specificBackground={styles.details}>

                            <h2>Gegevens</h2>
                            {!editDetails ?
                                <span>
                                    <section>
                                        <DisplayField label="Naam" text={student.name}/>
                                        <DisplayField label="Email" text={student.email}/>
                                        <DisplayField label="Leeftijd" text={student.age}/>
                                        <DisplayField label="Telefoonnummer" text={student.phoneNumber}/>
                                        <DisplayField label="Woonplaats" text={student.residence}/>
                                    </section>
                                    <section className={styles.avatar}>
                                        <div>
                                            <h2>Profielfoto</h2>
                                            <Avatar
                                                photo={student.photo ? `http://localhost:8080/files/download/${student.photo}` : ""}
                                                big="yes"
                                            />
                                        </div>
                                        <Button text="Gegevens wijzigen" color="blue" small="yes" onClick={() => toggleEditDetails(!editDetails)}
                                                addStyle={styles.edit_btn}/>
                                    </section>
                                </span>
                                :
                                <form onSubmit={handleSubmit(updateDetails)} encType="multipart/form-data">
                                    <section>
                                        <InputField
                                            label="Naam"
                                            type="text"
                                            inputName="name"
                                            prefilled={student.name}
                                            register={register}
                                            validationRules={{
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
                                            prefilled={student.email}
                                            register={register}
                                            validationRules={{
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
                                            prefilled={student.age}
                                            register={register}
                                            validationRules={{
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
                                            prefilled={student.phoneNumber}
                                            register={register}
                                            validationRules={{
                                                minLength: {value: 10, message: "Vul een geldig telefoonnummer in"},
                                                maxLength: {value: 13, message: "Vul een geldig telefoonnummer in"}
                                            }}
                                            errors={errors}
                                        />

                                        <InputField
                                            label="Woonplaats"
                                            type="text"
                                            inputName="residence"
                                            register={register}
                                            prefilled={student.residence}
                                            errors={errors}
                                        />
                                    </section>

                                    <section className={styles.avatar}>
                                        <div>
                                            <h2>Profielfoto</h2>

                                            <label className={styles.file_label}>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/png"
                                                    onChange={(e) => storeFile(e)}/>
                                                Kies een foto
                                            </label>
                                            {fileName && <>
                                            <p>Het gekozen bestand:</p>
                                            <p>{fileName}</p>
                                            </>}

                                            <Avatar
                                                photo={student.photo ? `http://localhost:8080/files/download/${student.photo}` : ""}
                                                alt={`Afbeelding van ${student.name}`}
                                                big="yes"
                                            />
                                        </div>

                                        <span>
                                            <Button text="Annuleren" color="orange" small="yes" onClick={() => toggleEditDetails(!editDetails)}
                                                    addStyle={styles.edit_btn}/>
                                            <Button type="submit" text="Bevestigen" color="green" small="yes"
                                                    addStyle={styles.edit_btn}/>
                                        </span>
                                    </section>
                                </form>
                            }
                    </Background>

                    <Background specificBackground={styles.about}>
                        <h2>Verzoek</h2>

                        <form className={styles.about_container} onSubmit={handleSubmit(updateRequest)}>
                            <section>
                                <DisplayField label="Instrument" text={student.instrument}/>
                                <DisplayField label="Voorkeur voor lesvorm" text={student.preferenceForLessonType}/>

                                <div className={styles.request}>
                                    <h4>Wat wil ik leren?</h4>
                                    {!editRequest ?
                                        <BigDisplayField text={student.request}/>
                                        :
                                        <InputTextarea
                                            inputName="request"
                                            placeholder={student.request}
                                            register={register}
                                            validationRules={{
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
                                    }
                                </div>
                            </section>

                            {user.authority === "ROLE_STUDENT" &&
                            <section className={styles.navigation}>
                                <div>
                                    {student.lesson.length > 0 &&
                                    <Button link={`/matchpage/teacher=${student.lesson[0].id.teacherId}&student=${user.id}`} text="Huiswerk" color="orange"
                                            addStyle={styles.navigation_btn}/>}
                                    <Button link="/availableteachers" text="Zoek naar docenten" color="blue" small="yes"
                                            addStyle={styles.navigation_btn}/>
                                    <Button link="/activeapplications" text="Openstaande aanvragen" color="blue" small="yes"
                                            addStyle={styles.navigation_btn}/>
                                </div>
                                {!editRequest ?
                                <Button text="Verzoek wijzigen" color="blue" small="yes" onClick={() => toggleEditRequest(!editRequest)}
                                        addStyle={styles.edit_btn}/>
                                    :
                                    <span>
                                        <Button text="Annuleren" color="orange" small="yes" onClick={() => toggleEditRequest(!editRequest)}
                                                 addStyle={styles.edit_btn}/>
                                        <Button type="submit" text="Bevestigen" color="green" small="yes"
                                                addStyle={styles.edit_btn}/>
                                    </span>}
                            </section>
                            }
                        </form>
                    </Background>

                    {loading && <Background><p>De gegevens worden geladen</p></Background>}
                    {error && <Background><p>Whoops, er ging iets mis met het ophalen van de data</p></Background>}
                </>
            }
            </>
            :
            <NotRegistered/>
        }
        </>
    );
};

export default StudentProfile;