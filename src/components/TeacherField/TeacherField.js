import React from 'react';
import Avatar from "../Avatar/Avatar";
import styles from "./TeacherField.module.css";
import Preference from "./Preference/Preference";
import Description from "../Description/Description";
import Details from "../Details/Details";
import robbert from "../../assets/Robbert.jpg";
import Button from "../StylingElements/Button/Button";
import Background from "../StylingElements/Background/Background";

const TeacherField = ({ name, age, residence, instrument, preference, description }) => {

    return (
        <Background>
            <Avatar
                photo={robbert}
                alt="Foto van docent"/>

            <span className={styles.info}>
                <Details
                    name={name}
                    age={age}
                    residence={residence}
                    instrument={instrument}
                />
                {/*<Preference*/}
                {/*    preference={preference}*/}
                {/*/>*/}
            </span>


            {/*<Description*/}
            {/*    description={description}*/}
            {/*/>*/}


            {/*<Button text="Les aanvragen" color="green" small="yes"/>*/}
        </Background>
    );
};

export default TeacherField;