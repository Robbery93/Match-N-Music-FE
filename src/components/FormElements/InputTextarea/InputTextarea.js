import React from "react";
import styles from './InputTextArea.module.css';
import {ErrorMessage} from "@hookform/error-message";

const InputTextarea = ({ inputName, register, validationRules, placeholder, errors }) => {
    return (
        <>
        <textarea
            className={styles.input_textarea}
            id={inputName}
            {...register(inputName, validationRules)}
            placeholder={placeholder}
        />
            <ErrorMessage errors={errors}
            name={inputName}
            render={({message}) => <p className={styles.error}>{message}</p>}
            />
        </>
    );
}

export default InputTextarea;
