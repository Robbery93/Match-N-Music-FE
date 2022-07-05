import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import axios from "axios";

import styles from "./TeacherProfile.module.css";
import robbert from "../../assets/Robbert.jpg";

import Header from "../../components/StylingElements/Header/Header";
import Background from "../../components/StylingElements/Background/Background";
import DisplayField from "../../components/StylingElements/DisplayField/DisplayField";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/StylingElements/Button/Button";
import BigDisplayField from "../../components/StylingElements/BigDisplayField/BigDisplayField";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import InputField from "../../components/FormElements/InputField/InputField";
import {useForm} from "react-hook-form";
import InputTextarea from "../../components/FormElements/InputTextarea/InputTextarea";

const TeacherProfile = () => {

    const { isAuth, user } = useContext(AuthContext);

    const { id } = useParams();

    const { register, handleSubmit, formState: {errors} } = useForm({mode: "onBlur"});

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [teacher, setTeacher] = useState({});
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);
    const [editDetails, toggleEditDetails] = useState(false);
    const [editDescriptionAndExperience, toggleEditDescriptionAndExperience] = useState(false);

    useEffect(() => {
        async function fetchTeacher() {
            try {
                const {data} = await axios.get(`http://localhost:8080/teachers/${id}`, axiosConfig)
                setTeacher(data);
                toggleLoading(false);
            } catch (e) {
                toggleError(true);
                toggleLoading(false);
                console.error(e);
            }
        }

        fetchTeacher();
    } , [])

    async function updateDetails(data) {
        try {
            await axios.patch(`http://localhost:8080/teachers/${user.id}`, {
                name: data.name,
                email: data.email,
                age: data.age,
                phoneNumber: data.phoneNumber,
                residence: data.residence
            }, axiosConfig)

            console.log("Update is gelukt!")
            toggleEditDetails(false);
            location.reload();
        } catch (e) {
            console.log("update niet gelukt")
        }
    }

    async function updateDescriptionAndExperience(data) {
        try {
            await axios.patch(`http://localhost:8080/teachers/${user.id}`, {
                description: data.description,
                experience: data.experience
            }, axiosConfig)

            console.log("Update is gelukt!")
            toggleEditDescriptionAndExperience(false);
            location.reload();
        } catch (e) {
            console.error("Update is niet gelukt")
        }
    }

    return (
        <> {isAuth ?
            <> {teacher &&
            <>
                {user.authority === "ROLE_TEACHER" ? <Header text="Mijn profiel" /> : <Header text={`Profiel van ${teacher.name}`} />}
                <Background specificBackground={styles.details}>
                    <h2>Gegevens</h2>

                    {!editDetails ?
                        <span>
                            <section>
                                <DisplayField label="Naam" text={teacher.name}/>
                                <DisplayField label="Email" text={teacher.email}/>
                                <DisplayField label="Leeftijd" text={teacher.age}/>
                                <DisplayField label="Telefoonnummer" text={teacher.phoneNumber}/>
                                <DisplayField label="Woonplaats" text={teacher.residence}/>
                            </section>

                            <section className={styles.avatar}>
                                <div>
                                    <h2>Profielfoto</h2>
                                    <Avatar photo={robbert} big="yes"/>
                                </div>
                                <Button text="Gegevens wijzigen" color="blue" small="yes" onClick={() => toggleEditDetails(!editDetails)}
                                        addStyle={styles.edit_btn}/>
                            </section>
                            </span>
                        :
                        <form onSubmit={handleSubmit(updateDetails)}>
                            <section>
                                <InputField
                                    label="Naam"
                                    type="text"
                                    inputName="name"
                                    prefilled={teacher.name}
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
                                    prefilled={teacher.email}
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
                                    prefilled={teacher.age}
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
                                    prefilled={teacher.phoneNumber}
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
                                    prefilled={teacher.residence}
                                    errors={errors}
                                />
                            </section>

                            <section className={styles.avatar}>
                                <div>
                                    <h2>Profielfoto</h2>
                                    <Avatar photo={robbert} big="yes"/>
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
                    <h2>Over mij</h2>


                    <form className={styles.about_container} onSubmit={handleSubmit(updateDescriptionAndExperience)}>
                        <section>
                            <DisplayField label="Instrument" text={teacher.instrument}/>
                            <DisplayField label="Voorkeur voor lesvorm" text={teacher.preferenceForLessonType}/>

                            <div className={styles.bigtxt}>
                                <h4>Iets over mij</h4>
                                {!editDescriptionAndExperience ?
                                    <BigDisplayField text={teacher.description} />
                                    :
                                    <InputTextarea
                                        inputName="description"
                                        placeholder={teacher.description}
                                        register={register}
                                        validationRules={{
                                            minLength: {
                                                value: 20,
                                                message: "Vul wat meer tekst in. Zo kan een leerling een betere indruk van je krijgen!"
                                            },
                                            maxLength: {
                                                value: 4000,
                                                message: "Ik denk dat je wel duidelijk genoeg ben geweest. Probeer het in iets minder woorden."
                                            }
                                        }}
                                        errors={errors}
                                    />
                                }
                                <h4>Mijn werkervaring</h4>
                                {!editDescriptionAndExperience ?
                                    <BigDisplayField text={teacher.experience} />
                                    :
                                    <InputTextarea
                                        inputName="experience"
                                        placeholder={teacher.experience}
                                        register={register}
                                        validationRules={{
                                            minLength: {
                                                value: 20,
                                                message: "Vul wat meer tekst in. Hierdoor is de kans dat leerlingen les van je willen misschien wel groter!"
                                            },
                                            maxLength: {
                                                value: 4000,
                                                message: "Ik denk dat je wel duidelijk genoeg ben geweest. Probeer het in iets minder woorden."
                                            }
                                        }}
                                        errors={errors}
                                    />
                                }
                            </div>
                        </section>

                        {user.authority === "ROLE_TEACHER" &&
                        <section className={styles.navigation}>
                            <div>
                                <Button link="/activelessons" text="Mijn leerlingen" color="orange" small="yes"
                                        addStyle={styles.navigation_btn}/>
                                <Button link="/studentapplications" text="Nieuwe aanvragen" color="orange" small="yes"
                                        addStyle={styles.navigation_btn}/>
                            </div>
                            {!editDescriptionAndExperience ?
                                <Button text="Verzoek wijzigen" color="blue" small="yes" onClick={() => toggleEditDescriptionAndExperience(!editDescriptionAndExperience)}
                                        addStyle={styles.edit_btn}/>
                                :
                                <span>
                                        <Button text="Annuleren" color="orange" small="yes" onClick={() => toggleEditDescriptionAndExperience(!editDescriptionAndExperience)}
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
            <NotRegistered />
            }
        </>
    );
};

export default TeacherProfile;