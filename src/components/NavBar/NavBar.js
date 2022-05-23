import React from 'react';
import mNMLogo from '../../assets/matchnmusicLogo.png';
import './NavBar.css'
import {Link} from "react-router-dom";

const NavBar = () => {

    return (
        <span className="navBar">
            <Link to="/">
                <img
                    className="logo"
                    src={mNMLogo}
                    alt = "Logo van Match 'n Match" />
            </Link>
        </span>
    );
};

export default NavBar;