import React, {useContext} from 'react';
import mNMLogo from '../../assets/matchnmusicLogo.png';
import './NavBar.css'
import {Link} from "react-router-dom";
import Button from "../StylingElements/Button/Button";
import {AuthContext} from "../../context/AuthContext";

const NavBar = () => {

    const { isAuth, logout } = useContext(AuthContext);

    return (
        <header className="navBar">
            <Link to="/">
                <img
                    className="logo"
                    src={mNMLogo}
                    alt = "Logo van Match 'n Music" />
            </Link>
            {isAuth === true &&
            <Button color="blue"
                    text="Uitloggen"
                    small="yes"
                    onClick={logout}
            />
            }

        </header>
    );
};

export default NavBar;