import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const navigate = useNavigate();

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
                    email: result.data.email,
                    id: result.data.id,
                    enabled: result.data.enabled,
                },
                status: 'done',
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function login(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwtDecode(JWT);

        fetchUserData(decoded.sub, JWT, '/profile');

        // link de gebruiker door naar de profielpagina
        // history.push('/profile');
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;