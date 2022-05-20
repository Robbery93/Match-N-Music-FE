import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from "./AvailableTeachers.module.css"
import TeacherField from "../../components/TeacherField/TeacherField";
import axios from "axios";

const AvailableTeachers = () => {

    const [teachers, setTeachers] = useState({});
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function fetchAvailableTeachers() {
            try {
                const results = await axios.get('http://localhost:8080/teachers', {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1MjI3NDE1NiwiaWF0IjoxNjUyMTg3NzU2fQ.8Zf-UAu5OpBWD9LER1gH_osSdy1Dd4_m7nmX84xS8TE"
                    }
                });

                setTeachers(results.data);
                toggleLoading(true);
            }
            catch(error) {
                toggleLoading(false)
                toggleError(true);
                console.log(error)
            }
        }

        fetchAvailableTeachers();
    }, [])

    return (
        <div className={styles.container}>
            <Header text="Beschikbare docenten" />
            <div className={styles.fields}>
                {teachers.length > 0 && teachers.map((teacher) => {
                    return <TeacherField
                        key={teacher.id}
                        name={teacher.name}
                        age={teacher.age}
                        residence={teacher.residence}
                        instrument={teacher.instruments}
                        preference={teacher.preferenceForLessonType}
                        description={teacher.description}
                    />
                })}

                {loading && <p>Beschikbare docenten worden opgehaald</p>}
                {error && <p>Whoops! Er ging iets fout met het ophalen van data...</p>}
            </div>
        </div>
    );
};

export default AvailableTeachers;