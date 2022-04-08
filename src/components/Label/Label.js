import React from "react";

const Label = ({ id, text }) => {
    return(
        <label
        htmlFor={id}>
            <h3>{text}</h3>
        </label>
    )
}

export default Label;