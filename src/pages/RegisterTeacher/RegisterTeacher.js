import React, {useState} from 'react';
import InputField from "../../components/InputField/InputField";
import skeleton from "../../assets/skeleton.jpg";
import "./RegisterTeacher.css"
import BlueButton from "../../components/Description/BlueButton/BlueButton";
import {useNavigate} from "react-router";

const RegisterTeacher = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [residence, setResidence] = useState("");

    const [description, setDescription] = useState("");
    const [experience, setExperience] = useState("");
    const [price, setPrice] = useState("");
    const [instrument, setInstrument] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div>
            <div className="field contact_field">
                <div className="background contact_background">
                    <div className="inputs">
                        <h2>Gegevens:</h2>

                        <InputField
                            className="input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Naam"
                        />
                        <InputField
                            className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <InputField
                            className="input"
                            type="text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Leeftijd"
                        />
                        <InputField
                            className="input"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Telefoonnummer +31"
                        />
                        <InputField
                            className="input"
                            type="text"
                            value={residence}
                            onChange={(e) => setResidence(e.target.value)}
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

            <div className="field description_field">
                <div className="background description_background">
                    <div className="second_left">
                        <h2>Over jezelf:</h2>

                        <div className="description">
                            <h3>Stel jezelf voor</h3>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Beschrijf jezelf in het kort!"
                            >
                        </textarea>
                        </div>

                        <div className="experience">
                            <h3>Werkervaring</h3>
                            <textarea
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            >
                        </textarea>
                        </div>
                    </div>

                    <div className="second_right">
                        <div className="instrument">
                            <h3>Welke instrument bespeel je?</h3>
                            <div className="instruments-field">
                                <InputField
                                    type="text"
                                    value={instrument}
                                    onChange={(e) => setInstrument(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="price">
                            <h3>Vraagprijs per 30 minuten:</h3>
                            <InputField
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Prijs in EUR"
                            />
                        </div>

                        <div className="preference">
                            <h3>Hoe wil je les krijgen?</h3>
                            <div className="checkbox_container">
                                <label htmlFor="live"><input type="checkbox" id="live" name="preference" value="Live les" />Live les</label>
                            </div>
                            <div className="checkbox_container">
                                <label htmlFor="online">
                                    <input type="checkbox" id="online" name="preference" value="Online les" />
                                    Online les
                                </label>
                            </div>
                        </div>

                        <div className="availability">
                            <h3>Op welke dagen ben je beschikbaar?</h3>
                            <ul>
                                <li>
                                    <input className="day" type="checkbox" id="ma" name="availability" value="Ma" />
                                    <label htmlFor="ma">Ma</label>
                                </li>
                                <li>
                                    <input className="day" type="checkbox" id="di" name="availability" value="Di" />
                                    <label htmlFor="di">Di</label>
                                </li>
                                <li>
                                    <input className="day" type="checkbox" id="wo" name="availability" value="Wo" />
                                    <label htmlFor="wo">Wo</label>
                                </li>
                                <li>
                                    <input className="day" type="checkbox" id="do" name="availability" value="Do" />
                                    <label htmlFor="do">Do</label>
                                </li>
                                <li>
                                    <input className="day" type="checkbox" id="vr" name="availability" value="Vr" />
                                    <label htmlFor="vr">Vr</label>
                                </li>
                                <li>
                                    <input className="day" type="checkbox" id="za" name="availability" value="Za" />
                                    <label htmlFor="za">Za</label>
                                </li>
                                <li>
                                    <input className="day" type="checkbox" id="zo" name="availability" value="Zo" />
                                    <label htmlFor="zo">Zo</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field user_field">
                <div className="background userTeacher_background">
                    <div className="user_inputs">
                        <div className="username">
                            <h3>Gebruikersnaam:</h3>
                            <InputField
                                className="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Gebruikersnaam"
                            />
                        </div>
                        <div className="password">
                            <h3>Wachtwoord:</h3>
                            <small>Minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool. </small>
                            <InputField
                                className="username"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Wachtwoord"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="register-btn"
                        onClick={() => navigate("/studentapplications")}
                    >Registreren</button>

                </div>
            </div>
        </div>
    );
};

export default RegisterTeacher;