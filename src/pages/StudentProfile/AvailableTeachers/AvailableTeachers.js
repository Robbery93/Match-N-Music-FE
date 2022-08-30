import React, {useContext, useEffect, useState} from 'react';
import Header from "../../../components/StylingElements/Header/Header";
import TeacherField from "../../../components/TeacherField/TeacherField";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import Background from "../../../components/StylingElements/Background/Background";
import NotRegistered from "../../../components/NotRegistered/NotRegistered";
import Button from "../../../components/StylingElements/Button/Button";

const AvailableTeachers = () => {

    const { user } = useContext(AuthContext);

    const [teachers, setTeachers] = useState({});
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    useEffect(() => {
        async function fetchAvailableTeachers() {
            try {
                const results = await axios.get(`http://localhost:8080/teachers?instrument=${user.instrument}&preference=${user.preference}`, axiosConfig);
                setTeachers(results.data)
                toggleLoading(false);
            }
            catch(error) {
                toggleLoading(false);
                toggleError(true);
                console.log(error)
            }
        }
        fetchAvailableTeachers();
    }, [])

    return (
        <>
            {user ?
                <>
                    {user.authority === "ROLE_STUDENT" ?
                        <>
                            <Header text="Beschikbare docenten" />
                            {teachers.length > 0 && teachers.map((teacher) => {
                                return <TeacherField
                                    key={teacher.id}
                                    name={teacher.name}
                                    age={teacher.age}
                                    residence={teacher.residence}
                                    instrument={teacher.instrument}
                                    preference={teacher.preferenceForLessonType}
                                    description={teacher.description}
                                    isApplication={false}
                                    userId={user.id}
                                    teacherId={teacher.id}
                                    photo={teacher.photo}
                                />
                            })}

                            {teachers.length === 0 && <Background><p><strong>Sorry...</strong> Op dit moment zijn er geen docenten voor de door jou opgegeven voorkeuren</p></Background>}
                            {loading && <Background><p>Beschikbare docenten worden opgehaald</p></Background>}
                            {error && <Background><p>Whoops! Er ging iets fout met het ophalen van data...</p></Background>}
                        </>
                        :
                        <Background>
                            <h3>Je hebt niet de juiste rechten om deze pagina te bekijken.</h3>
                            <Button color="orange" text="Terug" small="yes" onClick={() => history.goBack()} />
                        </Background>
                    }

                </>
                :
                <NotRegistered />
            }
        </>
    );
};

export default AvailableTeachers;