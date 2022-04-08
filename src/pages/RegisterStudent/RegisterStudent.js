import React from 'react';
import './RegisterStudent.css';
import InputField from "../../components/InputField/InputField";
import skeleton from "../../assets/skeleton.jpg";
import BlueButton from "../../components/Description/BlueButton/BlueButton";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import Label from "../../components/Label/Label";

const RegisterStudent = () => {

    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    const onFormSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="register_student_page">
            <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="field contact_field">
                <div className="background contact_background">
                    <div className="inputs">
                        <h2>Gegevens:</h2>
                        <InputField
                            className="input"
                            type="text"
                            {...register("name",{
                                required: true,
                                minLength: 2
                            })}
                            placeholder="Naam"
                        />
                        <InputField
                            className="input"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: value => value.includes("@"),
                            })}
                            placeholder="Email"
                        />
                        <InputField
                            className="input"
                            type="number"
                            {...register("age", {
                                required: true,
                                valueAsNumber: true
                            })}
                            placeholder="Leeftijd"
                        />
                        <InputField
                            className="input"
                            type="tel"
                            {...register("phoneNumber", {
                                required: true,
                                valueAsNumber: true
                            })}
                            placeholder="Telefoonnummer +31"
                        />
                        <InputField
                            className="input"
                            type="text"
                            {...register("residence")}
                            placeholder="Woonplaats"
                        />
                    </div>

                    <div className="avatar">
                        <div className="upload_text">
                            <h3>Foto uploaden:</h3>
                            <BlueButton
                                text="Kies een bestand"
                            />
                        </div>

                        <div className="picture">
                            <img src={skeleton} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="field request_field">
                <div className="background request_background">

                    <div className="request_left">
                        <h2>Je verzoek:</h2>
                        <div className="instrument">
                            <Label id="instrument">
                                <h3 className="select_h3">Instrument:</h3>
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

                        <div className="request">
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

                    <div className="request_right">
                        <div className="preference">
                            <h3>Hoe wil je les krijgen?</h3>
                            <div className="checkbox_container">
                                <label htmlFor="live">
                                    <input
                                        type="checkbox"
                                        id="live"
                                        name="preference"
                                        value="Live les" />
                                    Live les
                                </label>
                            </div>
                            <div className="checkbox_container">
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

                        <div className="availability">
                            <h3>Op welke dagen ben je beschikbaar?</h3>
                            <ul>
                                <li>
                                    <input
                                        className="day"
                                        type="checkbox"
                                        id="ma"
                                        name="availability"
                                        value="Ma" />
                                    <label htmlFor="ma">Ma</label>
                                </li>
                                <li>
                                    <input
                                        className="day"
                                        type="checkbox"
                                        id="di"
                                        name="availability"
                                        value="Di" />
                                    <label htmlFor="di">Di</label>
                                </li>
                                <li>
                                    <input
                                        className="day"
                                        type="checkbox"
                                        id="wo"
                                        name="availability"
                                        value="Wo" />
                                    <label htmlFor="wo">Wo</label>
                                </li>
                                <li>
                                    <input
                                        className="day"
                                        type="checkbox"
                                        id="do"
                                        name="availability"
                                        value="Do" />
                                    <label htmlFor="do">Do</label>
                                </li>
                                <li>
                                    <input
                                        className="day"
                                        type="checkbox"
                                        id="vr"
                                        name="availability"
                                        value="Vr" />
                                    <label htmlFor="vr">Vr</label>
                                </li>
                                <li>
                                    <input
                                        className="day"
                                        type="checkbox"
                                        id="za"
                                        name="availability"
                                        value="Za" />
                                    <label htmlFor="za">Za</label>
                                </li>
                                <li>
                                    <input
                                        className="day"
                                        type="checkbox"
                                        id="zo"
                                        name="availability"
                                        value="Zo" />
                                    <label htmlFor="zo">Zo</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field user_field">
                <div className="background user_background">
                        <div className="user_inputs">
                        <div className="username">
                            <h3>Gebruikersnaam:</h3>
                            <InputField
                                className="username"
                                type="text"
                                {...register("username")}
                                placeholder="Gebruikersnaam"
                            />
                        </div>
                        <div className="password">
                            <h3>Wachtwoord:</h3>
                            <small>Minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool. </small>
                            <InputField
                                className="username"
                                type="password"
                                {...register("password")}
                                placeholder="Wachtwoord"
                            />
                        </div>
                        </div>
                        <button
                            type="button"
                            className="register-btn"
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