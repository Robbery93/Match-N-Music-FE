import React, {useEffect, useState} from 'react';
import axios from "axios";
import StudentField from "../StudentField/StudentField";

const StudentApplication = ({ id, isActive }) => {

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [student, setStudent] = useState({});

    useEffect(() => {
        async function fetchStudent() {
            try {
                const {data} = await axios.get(`http://localhost:8080/students/${id}`, axiosConfig);
                setStudent(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchStudent();
    },[])

    return (
        <StudentField
            name={student.name}
            age={student.age}
            residence={student.residence}
            instrument={student.instrument}
            preference={student.preferenceForLessonType}
            request={student.request}
            studentId={student.id}
            isActive={isActive}
        />
    );
};

export default StudentApplication;