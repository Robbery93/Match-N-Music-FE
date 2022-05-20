import React from "react";
import './Form.css'

const Form = ({ onSubmit, children }) => {

    return(
        <form onSubmit={onSubmit} className="form_wrapper">
            {children}
        </form>
    )
}

export default Form;