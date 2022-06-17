import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import Header from "../../../components/StylingElements/Header/Header";
import StudentApplication from "../../../components/StudentApplication/StudentApplication";

const AllActiveLessons = () => {

    const { user } = useContext(AuthContext);

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [lessons, setLessons] = useState({});

    useEffect(() => {
        async function fetchActiveLessons(){
            try {
                const {data} = await axios.get(`http://localhost:8080/teachers/${user.id}/lessons`, axiosConfig)
                setLessons(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchActiveLessons();
    },[])
    
    return (
        <>
            <Header text="Alle active lessen" />
            {lessons.length > 0 &&
                <StudentApplication id="1" />
            }
        </>
    );
};

export default AllActiveLessons;