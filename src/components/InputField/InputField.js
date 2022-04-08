import React from 'react';

const InputField = ({ className, type, placeholder, register, children }) => {
    return (
        <>
            <input
                className={className}
                type={type}
                ref={register}
                placeholder={placeholder}
            />
            {children}
        </>
    );
};

export default InputField;