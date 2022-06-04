import React, {useContext, useEffect} from 'react';
import Header from "../../components/StylingElements/Header/Header";
import styles from "./MatchPage.module.css"
import robbert from "../../assets/Robbert.jpg"
import floortje from "../../assets/Floortje.jpg"
import Avatar from "../../components/Avatar/Avatar";
import HomeworkField from "../../components/HomeworkField/HomeworkField";
import Background from "../../components/StylingElements/Background/Background";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/StylingElements/Button/Button";
import NotRegistered from "../../components/NotRegistered/NotRegistered";

const MatchPage = () => {

    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log(user)
    },[])

    return (
        <>
            {user ? <>
                    <Header text="Match pagina" />
                    <Background specificBackground={styles.matchpage}>
                        <div className={styles.avatars}>
                            <Avatar photo={floortje}
                                    alt="Foto van leering"
                            />
                            <Avatar photo={robbert}
                                    alt="Foto van docent"
                            />
                        </div>

                        <div className={styles.homework_container}>
                            <HomeworkField
                                name="Floortje"
                                homework="Hallo?"
                            />
                            {user.authority === "ROLE_TEACHER" &&
                            <Button
                                id={styles.edit_btn}
                                color="orange"
                                text="Huiswerk aanpassen" />
                            }
                        </div>
                    </Background> </>
                :
                <NotRegistered />
            }
        </>
    );
};

export default MatchPage;
