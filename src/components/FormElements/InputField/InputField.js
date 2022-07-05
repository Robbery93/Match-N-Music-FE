import React from 'react';
import styles from './InputField.module.css';
import {ErrorMessage} from "@hookform/error-message";


const InputField = ({ label, type, inputName, prefilled, register, validationRules, errors }) => {

    return (
        <div className={styles.inputfield}>
            {label !== "none" && <h4>{`${label}:`}</h4> }
            <input
                className={styles.inputfield_input}
                autoComplete="off"
                id={inputName}
                type={type}
                placeholder={prefilled ? prefilled : label}
                {...register(inputName, validationRules)}
            />
            <ErrorMessage errors={errors}
                          name={inputName}
                          render={({message}) => <p className={styles.error}>{message}</p>} />
        </div>
    );
}

export default InputField;