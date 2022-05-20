import React from 'react';
import './InputField.css';


const InputField = ({ labelId, type, inputName, placeholder, register, validationRules }) => {


    return (
            <input
            className="inputfield"
            id={labelId}
            type={type}
            placeholder={placeholder}
            {...register(inputName, validationRules)}
        />
    );
}

export default InputField;