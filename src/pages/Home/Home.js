import React, {useContext, useState} from 'react';
import styles from './Home.module.css';
import {Link} from "react-router-dom";
import Button from "../../components/StylingElements/Button/Button";
import InputField from "../../components/FormElements/InputField/InputField";
import {useForm} from "react-hook-form";
import Form from "../../components/FormElements/Form/Form";
import Background from "../../components/StylingElements/Background/Background";
import Line from "../../components/StylingElements/Line/Line";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ErrorText from "../../components/ErrorMessage/ErrorText";

const Home = () => {

    const { register, handleSubmit } = useForm();
    const { login } = useContext(AuthContext);

    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    async function onSubmit(data) {
        try {
            const result = await axios.post("http://localhost:8080/authenticate", {
                username: data.username,
                password: data.password
            })
            login(result.data.jwt);

        } catch (error) {
            console.error(error.message)
            toggleError(true);
            setErrorMessage("Combinatie van gebruikersnaam/wachtwoord niet correct.");
        }
    }

    return (
        <>
            <div className={styles.side_by_side}>
            <section>
                <Background specificBackground={styles.title}>
                    <h1>Onze missie</h1>
                </Background>

                <Background specificBackground={styles.intro_text}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet animi autem beatae blanditiis corporis culpa dolor dolores ea eius est explicabo illum in ipsum itaque laborum, magnam minima molestiae molestias nam numquam odit, qui, repellat repudiandae sunt temporibus voluptates? A atque blanditiis corporis deserunt ex quibusdam quis voluptatibus.
                </Background>
            </section>

            <section>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Background specificBackground={styles.login}>

                        <InputField
                            type="text"
                            inputName="username"
                            placeholder="Gebruikersnaam"
                            register={register}
                        />
                        <InputField
                            type="password"
                            inputName="password"
                            placeholder="Wachtwoord"
                            register={register}
                        />

                        {error && <ErrorText errorMessage={errorMessage} />}

                        <Button
                            color="green"
                            type="submit"
                            text="Inloggen"
                        />

                        <Line />

                        <div className={styles.register}>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <Button color="orange" text="Registreren" />
                            </Link>
                        </div>

                    </Background>
                </Form>
            </section>
            </div>
        </>
    );
};

export default Home;