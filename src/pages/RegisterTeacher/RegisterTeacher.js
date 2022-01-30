import React, {useState} from 'react';
import InputField from "../../components/InputField/InputField";
import skeleton from "../../assets/skeleton.jpg";

const RegisterTeacher = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [residence, setResidence] = useState("");

    const [description, setDescription] = useState("");
    const [experience, setExperience] = useState("");
    const [price, setPrice] = useState("");
    const [instrument, setInstrument] = useState("");
    const [instruments, setInstruments] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div className="field contact_field">
                <div className="contact_background">
                    <div className="inputs">
                        <h2>Gegevens:</h2>

                        <InputField
                            className="input"
                            type="text"
                            value={name}
                            onChange={setName}
                            placeholder="Naam"
                        />
                        <InputField
                            className="input"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            placeholder="Email"
                        />
                        <InputField
                            className="input"
                            type="text"
                            value={age}
                            onChange={setAge}
                            placeholder="Leeftijd"
                        />
                        <InputField
                            className="input"
                            type="text"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            placeholder="Telefoonnummer +31"
                        />
                        <InputField
                            className="input"
                            type="text"
                            value={residence}
                            onChange={setResidence}
                            placeholder="Woonplaats"
                        />
                    </div>

                    <div className="avatar">
                        <div className="upload_text">
                            <h3>Foto uploaden:</h3>
                            <button
                                className='upload_btn'
                                type="button"
                            >
                                Kies een bestand
                            </button>
                        </div>

                        <div className="picture">
                            <img src={skeleton} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="field description_field">
                <div className="description_background">
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
                    <div className="price">
                        <h3>Vraagprijs per 30 minuten:</h3>
                        <InputField
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Prijs in EUR"
                        />
                    </div>
                    <div className="instruments">
                        <h3>Welke instrumenten bespeel je?</h3>
                        <div className="add_instruments">
                            <InputField
                                type="text"
                                value={instrument}
                                onChange={(e) => setInstrument(e.target.value)}
                            >
                                <button
                                    type="button"
                                    onClick={setInstruments(... + instrument)}
                                >Toevoegen</button>
                            </InputField>
                                <p>Instrumenten: ${instruments}</p>
                        </div>
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
                </div>
            </div>
            <div className="field user_field">
                <div className="user_background">
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
                            <small>Minimaal 8 karakters, waaronder één hoofdlettter, één kleine letter, een cijfer en een symbool. </small>
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
                    >Registreren</button>

                </div>
            </div>
        </div>
    );
};

export default RegisterTeacher;