import React from "react";

const InputTextarea = ({ labelId, inputName, validationRules, placeholder }) => {
    return (
        <textarea
            id={labelId}
            className={}
            {...register(inputName, validationRules)}
            placeholder={placeholder}
        ></textarea>
    );
}

export default InputTextarea;
