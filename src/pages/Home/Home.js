import React from 'react';
import styles from './Home.module.css';
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/FormComponents/InputField/InputField";
import {useForm} from "react-hook-form";
import Form from "../../components/FormComponents/Form/Form";
import Background from "../../components/StylingComponents/Background/Background";
import PageWrapper from "../../components/StylingComponents/PageWrapper/PageWrapper";
import Line from "../../components/StylingComponents/Line/Line";

const Home = () => {

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => console.log(data);

    return (
        <PageWrapper>
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
                            validationRules={{
                                required: "Je moet een gebruikersnaam invullen",
                                minLength: { value: 4, message: "Deze gebruikersnaam is te kort, gebruik minimaal 4 karakters." }
                            }}
                        />
                        <InputField
                            type="password"
                            inputName="password"
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

                        <Button
                            color="green"
                            type="submit"
                            text="Login" />


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
        </PageWrapper>
    );
};

export default Home;