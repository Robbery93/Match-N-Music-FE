import React from 'react';

const InputField = ({ className, type, value, onChange, placeholder, children }) => {
    return (
        <div>
            <input
                className={className}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {children}
        </div>
    );
};

export default InputField;