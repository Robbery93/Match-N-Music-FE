import React, {useContext, useEffect, useState} from 'react';
import Header from "../../../components/StylingElements/Header/Header";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import StudentApplication from "../../../components/StudentApplication/StudentApplication";

const StudentApplications = () => {

    const { user } = useContext(AuthContext);

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [applications, setApplications] = useState({});

    useEffect(() => {
        async function fetchApplications(){
            try {
                const {data} = await axios.get(`http://localhost:8080/teachers/${user.id}/applications`, axiosConfig)
                setApplications(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchApplications();
    },[])


    return (
        <>
            <Header text="Aanvragen van leerlingen" />
            {applications.length > 0 && applications.map(application => {
                return <StudentApplication
                    key={application.id.studentId}
                    id={application.id.studentId}/>
            })}
        </>
    );
};

export default StudentApplications;