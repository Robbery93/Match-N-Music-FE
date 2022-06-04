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
                    alt = "Logo van Match 'n Match" />
            </Link>
            {isAuth === true &&
            <Button color="blue"
                    text="Uitloggen"
                    onClick={logout}
            />
            }

        </header>
    );
};

export default NavBar;