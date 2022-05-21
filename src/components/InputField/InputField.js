import React from 'react';
import './InputField.css';
// import {ErrorMessage} from "@hookform/error-message";


const InputField = ({   type,
                        inputName,
                        placeholder,
                        register,
                        validationRules,
                        // errors
                    }) => {


    return (
        <>
            <input
                className="inputfield"
                id={inputName}
                type={type}
                placeholder={placeholder}
                {...register(inputName, validationRules)}
            />
            {/*<ErrorMessage*/}
            {/*    errors={errors}*/}
            {/*    name={inputName}*/}
            {/*    render={({message}) => <p className="error">{message}</p>}*/}
            {/*/>*/}
        </>
    );
}

export default InputField;