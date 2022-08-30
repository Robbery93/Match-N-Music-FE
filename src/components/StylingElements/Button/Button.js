import React from 'react';
import './Button.css';
import {NavLink} from "react-router-dom";

const Button = ({ link, color,small , addStyle, type, onClick, text }) => {
    return (
        <>
            {link ?
                <NavLink
                    className="navlink"
                    to={link}
                    style={{ textDecoration: 'none' }} >
                    <button
                        className={small === "yes" ? `${color} button small-button`: `${color} button`}
                        id={addStyle && addStyle}
                        type={type ? type : "button"}
                        onClick={onClick}
                    >
                        {text}
                    </button>
                </NavLink>
                :
                <button
                    className={small === "yes" ? `${color} button small-button`: `${color} button`}
                    id={addStyle && addStyle}
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