import React from 'react';
import mNMLogo from '../../assets/matchnmusicLogo.png';
import './NavBar.css'

const NavBar = () => {

    return (
        <>
            <div className="navBar">
            <img src={mNMLogo} alt = "Logo van Match 'n Match" />
            </div>
        </>
    );
};

export default NavBar;