import React from "react";

const Label = ({ id, text, children }) => {
    return(
        <label htmlFor={id}>
            <h3>{text}</h3>
            {children}
        </label>
    )
}

export default Label;