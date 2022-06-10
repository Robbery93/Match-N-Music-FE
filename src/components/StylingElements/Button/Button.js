import React from 'react';
import './Button.css';
import {Link} from "react-router-dom";

const Button = ({ link, color,small , addStyle, type, onClick, text }) => {
    return (
        <>
            {link ?
                <Link
                    to={link}
                    id={addStyle ? addStyle : ""}
                    style={{ textDecoration: 'none' }} >
                    <button
                        className={small === "yes" ? `button ${color}-button small-button`: `button ${color}-button`}
                        id={addStyle ? addStyle : ""}
                        type={type ? type : "button"}
                        onClick={onClick}
                    >
                        {text}
                    </button>
                </Link>
                :
                <button
                    className={small === "yes" ? `button ${color}-button small-button`: `button ${color}-button`}
                    id={addStyle ? addStyle : ""}
                    type={type ? type : "button"}
                    onClick={onClick}
                >
                    {text}
                </button>
            }
        </>
    );
};

export default Button;