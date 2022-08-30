import React from 'react';
import styles from "./NotRegistered.module.css"
import PageWrapper from "../StylingElements/PageWrapper/PageWrapper";
import Background from "../StylingElements/Background/Background";
import {Link} from "react-router-dom";

const NotRegistered = () => {
    return (
        <PageWrapper>
            <Background specificBackground={styles.not_registered}>
                <span>
                    <p>Om gebruik te maken van deze webapplicatie moet je ingelogd zijn, of je registreren.</p>
                    <br />
                    <p>Klik <Link to="/">hier</Link> om in je te loggen, of klik <Link to="/register">hier</Link> om je te registreren.</p>
                </span>
            </Background>
        </PageWrapper>
    );
};

export default NotRegistered;