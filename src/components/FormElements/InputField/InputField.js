import React from 'react';
import './InputField.css';
// import {ErrorText} from "@hookform/error-message";


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
                autoComplete="off"
                id={inputName}
                type={type}
                placeholder={placeholder}
                {...register(inputName, validationRules)}
            />
            {/*<ErrorText*/}
            {/*    errors={errors}*/}
            {/*    name={inputName}*/}
            {/*    render={({message}) => <p className="error">{message}</p>}*/}
            {/*/>*/}
        </>
    );
}

export default InputField;