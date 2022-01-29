import React from 'react';
import './ContactInformationField.css'
import InputField from "../InputField/InputField";
import skeleton from '../../assets/skeleton.jpg'

const ContactInformationField = ({ name, setName, email, setEmail, age, setAge, phoneNumber, setPhoneNumber, residence, setResidence }) => {
    return (
        <div className="field">
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
    );
};

export default ContactInformationField;