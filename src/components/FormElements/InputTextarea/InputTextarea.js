import React from "react";
import './InputTextArea.css'

const InputTextarea = ({ inputName, register, validationRules, placeholder }) => {
    return (
        <textarea
            className="input-textarea"
            id={inputName}
            {...register(inputName, validationRules)}
            placeholder={placeholder}
        />
    );
}

export default InputTextarea;
