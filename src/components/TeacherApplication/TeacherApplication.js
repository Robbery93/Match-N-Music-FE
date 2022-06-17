import React, {useEffect, useState} from 'react';
import axios from "axios";
import TeacherField from "../TeacherField/TeacherField";

const TeacherApplication = ({ id }) => {

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [teacher, setTeacher] = useState({});

    useEffect(() => {
        async function fetchTeacher() {
            try {
                const {data} = await axios.get(`http://localhost:8080/teachers/${id}`, axiosConfig);
                setTeacher(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchTeacher();
    },[])

    return (
        <TeacherField
            name={teacher.name}
            age={teacher.age}
            residence={teacher.residence}
            instrument={teacher.instrument}
            preference={teacher.preferenceForLessonType}
            description={teacher.description}
            isApplication={true}
            teacherId={teacher.id}
        />
    );
};

export default TeacherApplication;