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
            const {data} = await axios.get(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data.student) {
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: {
                        username: data.username,
                        enabled: data.enabled,
                        authority: data.authorities[0].authority,
                        id: data.student.id,
                        instrument: data.student.instrument,
                        preference: data.student.preferenceForLessonType
                    },
                    status: 'done',
                });
            } else if(data.teacher) {
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: {
                        username: data.username,
                        enabled: data.enabled,
                        authority: data.authorities[0].authority,
                        id: data.teacher.id,
                        instrument: data.teacher.instrument,
                        preference: data.teacher.preferenceForLessonType
                    },
                    status: 'done',
                });
            } else {
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: {
                        username: data.username,
                        enabled: data.enabled,
                        authority: data.authorities[0].authority,
                    },
                    status: 'done',
                });
            }


            if (redirectUrl) {

                if (data.authorities[0].authority === "ROLE_STUDENT") {
                    history.push(`/student${redirectUrl}/${data.student.id}`);
                } else if (data.authorities[0].authority === "ROLE_TEACHER") {
                    history.push(`/teacher${redirectUrl}/${data.teacher.id}`);
                } else {
                    history.push("/")
                }
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
    }

    function login(jwt) {
        localStorage.setItem('token', jwt);
        const decoded = jwtDecode(jwt);

        fetchUserData(decoded.sub, jwt, "profile");
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
        console.log(`${isAuth.user.username} is uitgelogd.`);
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