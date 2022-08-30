import React from 'react';
import './DisplayField.css';

const DisplayField = ({ label, text }) => {
    return (
        <div className="display_field">
            <h4>{label}:</h4>
            <span className="display-field_text">
                <p>{text}</p>
            </span>
        </div>
    );
};

export default DisplayField;