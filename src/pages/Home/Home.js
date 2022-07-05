import React, {useContext, useEffect, useState} from 'react';
import styles from './Home.module.css';
import Button from "../../components/StylingElements/Button/Button";
import InputField from "../../components/FormElements/InputField/InputField";
import {useForm} from "react-hook-form";
import Background from "../../components/StylingElements/Background/Background";
import Line from "../../components/StylingElements/Line/Line";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ErrorText from "../../components/ErrorText/ErrorText";

const Home = () => {

    const { register, handleSubmit, formState: {errors} } = useForm();
    const { login, user } = useContext(AuthContext);

    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    async function onSubmit(data) {
        try {
            const result = await axios.post("http://localhost:8080/authenticate", {
                username: data.username,
                password: data.password
            })
            login(result.data.jwt, "profile");

        } catch (error) {
            console.error(error.message)
            toggleError(true);
            setErrorMessage("Combinatie van gebruikersnaam/wachtwoord niet correct.");
        }
    }

    useEffect(() => {
        if (user) {
            const role = user.authority;

            if (role === "ROLE_STUDENT") {
                console.log("Studentje");
                window.location.replace(`/studentprofile/${user.id}`);
            }
            if (role === "ROLE_TEACHER") {
                console.log("Docentje");
                window.location.replace(`/teacherprofile/${user.id}`);
            }
        }

    } ,[])

    return (
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Background specificBackground={styles.login}>
                        <div className={styles.login_inputs}>
                            <InputField
                                type="text"
                                inputName="username"
                                label="Gebruikersnaam"
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                type="password"
                                inputName="password"
                                label="Wachtwoord"
                                register={register}
                                errors={errors}
                            />
                        </div>

                        {error && <ErrorText errorMessage={errorMessage} />}

                        <div className={styles.login_btns}>
                            <Button color="green" type="submit" text="Inloggen" />
                            <Line />
                            <Button color="orange" text="Registreren" link="/register" />
                        </div>

                    </Background>
                </form>
            </section>
        </div>
    );
};

export default Home;