import React from 'react';
import Avatar from "../Avatar/Avatar";
import styles from "./TeacherField.module.css";
import Price from "./Price/Price";
import Preference from "./Preference/Preference";
import Description from "../Description/Description";
import GreenButton from "../GreenButton/GreenButton";
import Details from "../Details/Details";
import robbert from "../../assets/Robbert.jpg"

const TeacherField = () => {
    return (
        <div className={styles.field}>
            <div className={styles.details}>
                <Avatar
                    photo={robbert}
                    alt="Foto van docent"/>
                <div className={styles.text}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <Details
                            name="Robbert"
                            age="28"
                            residence="Rotterdam"
                            />
                        </div>
                        <div className={styles.right}>
                            <Price
                            price="30" />
                            <Preference
                            preference="Live les en Online les"
                            />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <Description
                        description="Robbert is een Rotterdamse gitarist, componist, arrangeur en docent. Als laatbloeier begon hij op zestienjarige
            leeftijd als autodidact op de gitaar, en al snel werd de muziek een obsessie. Hij bekwaamde zich in uiteenlopende stijlen,
            van akoestische sologitaar (Sacksioni), pop en rock – Red Hot Chili Peppers was een favoriet – via blues (Hendrix, Clapton)
            en instrumentale rock (Satriani) naar jazz en gypsy jazz."/>
                    </div>
                </div>
            </div>
            <div className={styles.button}>
                <GreenButton
                    text="Les aanvragen"
                />
            </div>
        </div>
    );
};

export default TeacherField;