import React from 'react';
import './InputField.css';


const InputField = ({   label,
                        type,
                        inputName,
                        placeholder,
                        register,
                        validationRules,
                    }) => {


    return (
        <div className="inputfield">
            {label !== "none" && <h4>{label}:</h4>}
            <input
                className="inputfield_input"
                autoComplete="off"
                id={inputName}
                type={type}
                placeholder={placeholder}
                {...register(inputName, validationRules)}
            />
        </div>
    );
}

export default InputField;