import React from "react";
import './InputTextArea.css'

const InputTextarea = ({ labelId, inputName, register, validationRules, placeholder }) => {
    return (
        <textarea
            className="input-textarea"
            id={labelId}
            {...register(inputName, validationRules)}
            placeholder={placeholder}
        />
    );
}

export default InputTextarea;
