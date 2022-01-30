import React, {useState} from 'react';
import './RegisterStudent.css'
import ContactInformationField from "../../components/ContactInformationField/ContactInformationField";
import RequestField from "../../components/RequestField/RequestField";
import InputField from "../../components/InputField/InputField";

const RegisterStudent = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="register_student_page">
            <ContactInformationField />
            <RequestField />
            <div className="field">
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

export default RegisterStudent;