import React, {createContext, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import axios from "axios";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const history = useHistory();

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

        console.log(isAuth);
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
                history.push(redirectUrl);
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

        fetchUserData(decoded.sub, JWT, "/matchpage");

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
        history.push('/');
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;