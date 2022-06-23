import React from "react";

const Label = ({ id, text, children }) => {
    return(
        <label htmlFor={id}>
            {text !== "" && <h4>{text}</h4>}
            {children}
        </label>
    )
}

export default Label;