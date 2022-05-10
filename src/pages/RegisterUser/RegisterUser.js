import React from "react";
import axios from "axios";
import InputField from "../../components/InputField/InputField";
import {useForm} from "react-hook-form";

const RegisterUser = () => {

    const {register, handleSubmit} = useForm();


    async function createStudent(data) {
            await axios.post(`http://localhost:8080/users/student`,
                {
                username: data.username,
                password: data.password
            },)
    }

    return (
        <>
            <form onSubmit={handleSubmit(createStudent)}>
                <label htmlFor="username"> Gebruikersnaam
                    <InputField
                        labelId="username"
                        type="text"
                        name="username"
                        placeholder="Gebruikersnaam"
                        register={register}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Je moet een gebruikersnaam invullen"
                            },
                            minLength: {
                                value: 4,
                                message: "Deze gebruikersnaam is te kort, gebruik minimaal 4 tekens."
                            },
                            maxLength: {
                                value: 15,
                                message: "Deze gebruikersnaam ie te lang, gebruik maximaal 15 tekens"
                            }
                        }}
                />
                </label>
                <label htmlFor="password"> Wachtwoord
                    <InputField
                        labelId="password"
                        type="password"
                        name="password"
                        placeholder="Wachtwoord"
                        register={register}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Je moet een wachtwoord invullen."
                            },
                            minLength: {
                                value: 8,
                                message: "Gebruik minimaal 8 karakters, waaronder één hoofdletter, één kleine letter, een cijfer en een symbool."
                            }
                        }}
                    />
                </label>
                <button type="submit">
                    submit
                </button>
            </form>
        </>
    )
}

export default RegisterUser;