import React, {createContext, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import axios from "axios";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    const history = useHistory();

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode(token);
            fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, [])

    async function fetchUserData(username, token, redirectUrl) {
        try {
            const result = await axios.get(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    enabled: result.data.enabled,
                    authority: result.data.authorities[0].authority
                },
                status: 'done',
            });

            if (redirectUrl) {
                history.push(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
            console.log("Je zit nu in het catch blok")
        }

        console.log(isAuth)
    }

    function login(jwt) {
        localStorage.setItem('token', jwt);
        const decoded = jwtDecode(jwt);

        fetchUserData(decoded.sub, jwt, "/matchpage");
    }

    function registerUser(jwt) {
        localStorage.setItem('token', jwt)
        const decoded = jwtDecode(jwt);

        fetchUserData(decoded.sub, jwt)
    }

    function logout() {
        if(confirm("Weet je zeker dat je wil uitloggen?\n\nAls je op OK klikt, wordt je teruggestuurd naar de homepagina")) {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log("Gebruiker is uitgelogd.");
        history.push("/");
        }
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login,
        registerUser,
        logout
    }

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;