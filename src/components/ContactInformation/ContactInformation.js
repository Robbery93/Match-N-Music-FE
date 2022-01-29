import React from 'react';
import './ContactInformation.css'
import InputField from "../InputField/InputField";

const ContactInformation = ({ name, setName, email, setEmail, age, setAge, phoneNumber, setPhoneNumber, residence, setResidence}) => {
    return (
        <div>
            <h2>Gegevens</h2>
            <InputField
                type="text"
                value={name}
                onChange={setName}
                placeholder="Naam"
            />
            <InputField
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Email"
            />
            <InputField
                type="text"
                value={age}
                onChange={setAge}
                placeholder="Leeftijd"
            />
            <InputField
                type="text"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="Telefoonnummer +31"
            />
            <InputField
                type="text"
                value={residence}
                onChange={setResidence}
                placeholder="Woonplaats"
            />
        </div>
    );
};

export default ContactInformation;