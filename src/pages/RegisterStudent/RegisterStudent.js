import React from 'react';
import styles from './RegisterStudent.module.css';
import InputField from "../../components/InputField/InputField";
import skeleton from "../../assets/skeleton.jpg";
import BlueButton from "../../components/BlueButton/BlueButton";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import Label from "../../components/Label/Label";

const RegisterStudent = () => {

    const navigate = useNavigate()

    const { register, handleSubmit } = useForm();

    const onFormSubmit = (data) => {
        console.log(data)
        console.log("hallooooo")
    }

    return (
        <div className={styles.register_student_page}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className={`${styles.field} ${styles.contact_field}`}>
                <div className={`${styles.background} ${styles.contact_background}`}>
                    <div className={styles.inputs}>
                        <h2>Gegevens:</h2>
                        <InputField
                            className={styles.input}
                            type="text"
                            name="name"
                            register={register("name")}
                            placeholder="Naam"
                        />
                        <InputField
                            className={styles.input}
                            type="email"
                            {...register("email", {
                                required: true
                            })}
                            placeholder="Email"
                        />
                        <InputField
                            className={styles.input}
                            type="number"
                            {...register("age", {
                                required: true,
                                valueAsNumber: true
                            })}
                            placeholder="Leeftijd"
                        />
                        <InputField
                            className={styles.input}
                            type="tel"
                            {...register("phoneNumber", {
                                required: true,
                                pattern: "[0-9]{10}"
                            })}
                            placeholder="Telefoonnummer +31"
                        />
                        <InputField
                            className={styles.input}
                            type="text"
                            register={register}
                            placeholder="Woonplaats"
                        />
                    </div>

                    <div className={styles.avatar}>
                        <div className={styles.upload_text}>
                            <h3>Foto uploaden:</h3>
                            <BlueButton
                                text="Kies een bestand"
                            />
                        </div>

                        <div className={styles.pictures}>
                            <img src={skeleton}  alt="Afbeelding"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.field} ${styles.request_field}`}>
                <div className={`${styles.background} ${styles.request_background}`}>

                    <div className={styles.request_left}>
                        <h2>Je verzoek:</h2>
                        <div className={styles.instrument}>
                            <Label id="instrument">
                                <h3 className={styles.select_h3}>Instrument:</h3>
                            </Label>
                            <select name="instrument"
                                    id="instrument"
                                    placeholder="Kies een instrument"
                                    {...register("intrument")}>
                                <option value="guitar">Gitaar</option>
                                <option value="bassguitar">Basgitaar</option>
                                <option value="piano">Piano</option>
                                <option value="keyboard">Keyboard</option>
                                <option value="singing">Zang</option>
                                <option value="drums">Drum</option>
                                <option value="other">Anders</option>
                            </select>
                        </div>

                        <div className={styles.request}>
                                <Label id="request"
                                        text="Wat wil je leren?">
                                </Label>
                            <textarea
                                {...register("request")}
                                placeholder="Wees zo duidelijk mogelijk!"
                            >
                        </textarea>
                        </div>
                    </div>

                    <div className={styles.request_right}>
                        <div className={styles.preference}>
                            <h3>Hoe wil je les krijgen?</h3>
                            <div className={styles.checkbox_container}>
                                <label htmlFor="live">
                                    <input
                                        type="checkbox"
                                        id="live"
                                        name="preference"
                                        value="Live les" />
                                    Live les
                                </label>
                            </div>
                            <div className={styles.checkbox_container}>
                                <label htmlFor="online">
                                    <input
                                        type="checkbox"
                                        id="online"
                                        name="preference"
                                        value="Online les" />
                                    Online les
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.field} ${styles.user_field}`}>
                <div className={`${styles.background} ${styles.user_background}`}>
                    <div className={styles.user_inputs}>
                        <div className={styles.username}>
                            <h3>Gebruikersnaam:</h3>
                            <InputField
                                className={styles.username}
                                type="text"
                                {...register("username")}
                                placeholder="Gebruikersnaam"
                            />
                        </div>
                        <div className={styles.password}>
                            <h3>Wachtwoord:</h3>
                            <small>Minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool. </small>
                            <InputField
                                className={styles.username}
                                type="password"
                                {...register("password")}
                                placeholder="Wachtwoord"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className={styles.register_btn}
                        onClick={() => navigate("/availableteachers")}
                    >Registreren</button>
                    <button
                        type="submit">
                        Submit
                    </button>
                </div>
            </div>

        </form>
        </div>
    );
};

export default RegisterStudent;