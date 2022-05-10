import React from 'react';

const InputField = ({ className, labelId, type, inputName, register, validationRules, placeholder, children }) => {
    return (
        <>
            <input
                className={className}
                id={labelId}
                type={type}
                name={inputName}
                {...register(inputName, validationRules)}
                placeholder={placeholder}
            />
            {children}
        </>
    );
};

export default InputField;