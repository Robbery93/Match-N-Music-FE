import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from "./AvailableTeachers.module.css"
import TeacherField from "../../components/TeacherField/TeacherField";
import axios from "axios";

const AvailableTeachers = () => {

    const [teachers, setTeachers] = useState({});

    useEffect(() => {
        async function fetchAvailableTeachers() {
            try {
                const results = await axios.get('http://localhost:8080/teachers?instrument=guitar', {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1MjI3NDE1NiwiaWF0IjoxNjUyMTg3NzU2fQ.8Zf-UAu5OpBWD9LER1gH_osSdy1Dd4_m7nmX84xS8TE"
                    }
                });

                setTeachers(results.data)

                console.log(results.data)
            }
            catch(error) {
                console.log(error)
            }
        }

        fetchAvailableTeachers();
    }, [])

    return (
        <div className={styles.container}>
            <Header text="Beschikbare docenten" />
            <div className={styles.fields}>
                {Object.keys(teachers).length > 0 && teachers.map((teacher) => {
                    return <TeacherField
                    />
                })}
            <TeacherField />
            </div>
        </div>
    );
};

export default AvailableTeachers;