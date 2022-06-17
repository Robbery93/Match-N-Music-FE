import React, {useContext} from 'react';
import mNMLogo from '../../assets/matchnmusicLogo.png';
import styles from './NavBar.module.css'
import {NavLink} from "react-router-dom";
import Button from "../StylingElements/Button/Button";
import {AuthContext} from "../../context/AuthContext";

const NavBar = () => {

    const { isAuth, user,  logout } = useContext(AuthContext);

    return (
        <header className={styles.navBar}>
            <NavLink to="/" className={styles.logo}>
                <img
                    className={styles.logo_image}
                    src={mNMLogo}
                    alt = "Logo van Match 'n Music" />
            </NavLink>
            {isAuth === true &&
                <>
                <Button color="blue" text="Profiel" small="yes" link={`/studentprofile/${user.id}`} addStyle={styles.profile_btn}/>
                <Button color="orange"
                        text="Uitloggen"
                        small="yes"
                        onClick={logout}
                />
            </>
            }

        </header>
    );
};

export default NavBar;