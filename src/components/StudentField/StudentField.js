import React from 'react';
import styles from "./StudentField.module.css"
import Avatar from "../Avatar/Avatar";
import Details from "../Details/Details";
import Description from "../Description/Description";
import floortje from "../../assets/Floortje.jpg"
import Button from "../Button/Button";

const StudentField = () => {
    return (
        <div className={styles.field}>
            <div className={styles.request}>
            <Avatar
                photo={floortje}
                alt="foto van leerling" />
                <div className={styles.details}>
                    <Details
                        name="Floortje"
                        age="10"
                        residence="Capelle aan den IJssel"/>

                    <Description description="Hallo, ik ben Floortje en ik ben 10 jaar oud. Ik woon met mijn broertje, mama en papa in Capelle aan den IJssel. Mijn papa speelt al heel lang gitaar en het lijkt mij heel cool om dat ook te kunnen. Mijn lievelingsartiesten zijn: Miley Cyrus en Ilse de Lange. Ik hoop snel op les te kunnen en heel mooi gitaar te leren spelen. " />
                </div>
            </div>
            <div className={styles.button}>
                <Button text="Aanvraag accepteren" color="green" />
            </div>
        </div>
    );
};

export default StudentField;