import React from 'react';
import InputField from "../../components/InputField/InputField";
import skeleton from "../../assets/skeleton.jpg";
import styles from "./RegisterTeacher.module.css"
import Button from "../../components/Button/Button";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import Background from "../../components/Background/Background";
import Form from "../../components/Form/Form";
import Avatar from "../../components/Avatar/Avatar";
import Label from "../../components/Label/Label";
import InputTextarea from "../../components/InputTextarea/InputTextarea";
import InstrumentSelector from "../../components/InstrumentSelector/InstrumentSelector";

const RegisterTeacher = () => {

    const { register, handleSubmit, formState: {errors} } = useForm({ mode: "onBlur" })

    const onFormSubmit = (data) => {
        console.log(data)
    }

    // const [instrument, setInstrument] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");


    return (
        <main className={styles.register_teacher_page}>
            <Form onSubmit={handleSubmit(onFormSubmit)}>

                <Background>
                    <section className="inputs">
                        <h2>Gegevens</h2>

                        <InputField
                            type="text"
                            inputName="name"
                            placeholder="Naam"
                            register={register}
                            validationRules={{
                                required: "Een naam invullen is verplicht",
                                minLength: { value: 2, message: "Je naam moet uit minimaal 2 letters bestaan" }
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="name"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />

                        <InputField
                            type="email"
                            inputName="email"
                            placeholder="Email"
                            register={register}
                            validationRules={{
                                required: "Email adres mag niet leeg zijn",
                                minLength: { value: 6, message: "Emailadres is te kort. Gebruik een \"@\"" }
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="email"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />

                        <InputField
                            type="text"
                            inputName="age"
                            placeholder="Leeftijd"
                            register={register}
                            validationRules={{
                                required: "Je leeftijd invullen is verplicht",
                                min: { value: 16, message: "Je moet minimaal 16 jaar oud zijn om je in te schrijven" }
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="age"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />

                        <InputField
                            type="number"
                            inputName="phoneNumber"
                            placeholder="Telefoonnummer bv: 06-12345678"
                            register={register}
                            validationRules={{
                                required: "Je telefoonnummer is verplicht",
                                minLength: { value: 10, message: "Vul een geldig telefoonnummer in" },
                                maxLength: { value: 13, message: "Vul een geldig telefoonnummer in" }
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="phoneNumber"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />

                        <InputField
                            type="text"
                            inputName="residence"
                            placeholder="Woonplaats"
                            register={register}
                            validationRules={{
                                required: "Een woonplaats invullen is verplicht."
                            }}
                        />
                        <ErrorMessage errors={errors}
                                      name="residence"
                                      render={({ message }) => <p className={styles.error}>{message}</p>}
                        />
                    </section>

                    <aside className={styles.avatar}>
                        <span className={styles.upload_text}>
                            <h3>Foto uploaden:</h3>
                            <Button
                                text="Kies een bestand"
                                color="blue"
                            />
                        </span>

                        <Avatar photo={skeleton} alt="Afbeelding" />
                    </aside>
                </Background>

                <Background>
                    <section>
                    <h2>Over jezelf:</h2>


                        <span>
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
                                    minLength: { value: 20, message: "Dat is wel heel erg kort. Probeer iets meer over jezelf te vertellen (minimaal 20 karakters)" },
                                    maxLength: { value: 2000, message: "Dit is wel iets langer dan \"kort\"... (maximaal 2000 karakters)" }
                                }}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="description"
                                render={({ message }) => <p className={styles.error}>{message}</p>}
                            />

                        </span>

                        <span>
                            <Label
                                id="experience"
                                text="Werkervaring"
                                />
                            <InputTextarea
                                inputName="experience"
                                placeholder="Beschrijf hier je werkervaring. Bijvoorbeeld hoe lang je waar werkzaam bent, relevante opleidingen, enzovoorts..."
                                register={register}
                                validationRules={{
                                    required: "Een beschrijving over je werkervaring is verplicht",
                                    minLength: { value: 20, message: "Dat is wel heel erg kort. Probeer iets meer over je werkervaring te vertellen (minimaal 20 karakters)" },
                                    maxLength: { value: 4000, message: "Dat is wel erg veel ervaring! Kijk of je het iets compacter kan opschrijven (maximaal 4000 karakters)" }
                                }}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="experience"
                                render={({ message }) => <p className={styles.error}>{message}</p>}
                            />
                        </span>
                    </section>

                    <aside>
                    <section className={styles.instrument}>
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
                    </section>

                    <section className={styles.preference}>
                        <h3>Hoe wil je les krijgen?</h3>
                        <label>
                            <input
                                type="checkbox"
                                {...register("preferenceForLessonType")}
                                value="Live lessen"
                            />
                            Live les
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register("preferenceForLessonType")}
                                value="Online lessen"
                            />
                            Online les
                        </label>
                    </section>
                    </aside>

                </Background>

                <Background>

                </Background>
            </Form>
        </main>
    );
};

export default RegisterTeacher;


{/*<div className="field user_field">*/}
{/*    <div className="background userTeacher_background">*/}
{/*        <div className="user_inputs">*/}
{/*            <div className="username">*/}
{/*                <h3>Gebruikersnaam:</h3>*/}
{/*                <InputField*/}
{/*                    className="username"*/}
{/*                    type="text"*/}
{/*                    value={username}*/}
{/*                    onChange={(e) => setUsername(e.target.value)}*/}
{/*                    placeholder="Gebruikersnaam"*/}
{/*                />*/}
{/*            </div>*/}
{/*            <div className="password">*/}
{/*                <h3>Wachtwoord:</h3>*/}
{/*                <small>Minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool. </small>*/}
{/*                <InputField*/}
{/*                    className="username"*/}
{/*                    type="password"*/}
{/*                    value={password}*/}
{/*                    onChange={(e) => setPassword(e.target.value)}*/}
{/*                    placeholder="Wachtwoord"*/}
{/*                />*/}
{/*            </div>*/}
{/*        </div>*/}
{/*        <button*/}
{/*            type="button"*/}
{/*            className="register-btn"*/}
{/*            onClick={() => navigate("/studentapplications")}*/}
{/*        >Registreren</button>*/}

{/*    </div>*/}
{/*</div>*/}