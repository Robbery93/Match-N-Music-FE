import React, {useContext, useEffect, useState} from 'react';
import Header from "../../../components/StylingElements/Header/Header";
import Background from "../../../components/StylingElements/Background/Background";
import Button from "../../../components/StylingElements/Button/Button";
import NotRegistered from "../../../components/NotRegistered/NotRegistered";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import TeacherApplication from "../../../components/TeacherApplication/TeacherApplication";
import {Link} from "react-router-dom";

const ActiveApplicationsForStudent = () => {

    const { user } = useContext(AuthContext);

    const axiosConfig = { headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }};

    const [applications, setApplications] = useState({});
    const [lesson, setLesson] = useState({});
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function fetchAllApplications() {
            try {
                const { data } = await axios.get(`http://localhost:8080/students/${user.id}/applications`, axiosConfig);
                setApplications(data);

                const result = await axios.get(`http://localhost:8080/students/${user.id}/lesson`, axiosConfig);
                if(result.data.length > 0) {
                    setLesson(result.data);
                }
                toggleLoading(false)
            } catch (e) {
                console.error(e);
                toggleError(true);
                toggleLoading(false);
            }
        }

        fetchAllApplications();
    }, [])

    return (
        <>
            {user ?
                <>
                    {user.authority === "ROLE_STUDENT" ?
                        <>
                            <Header text="Jouw aanvragen" />
                            {applications.length > 0 && applications.map(application => {
                            return <TeacherApplication
                                key={application.id.teacherId}
                                id={application.id.teacherId} />
                            })}

                            {applications.length === 0 &&
                            <> {lesson.length > 0 ?
                                <Background>
                                    <p><strong>Je bent al gematcht met een docent!</strong></p>
                                    <Button color="orange" text="Naar de matchpagina" small="yes" link={`/matchpage/teacher=${lesson[0].id.teacherId}&student=${user.id}`} />
                                </Background>
                                :
                                <Background><p>Je hebt nog geen aanvragen gedaan. Check <Link to="/availableteachers">deze</Link> pagina om naar beschikbare docenten te zoeken!</p></Background>
                            }
                            </>
                            }


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

export default ActiveApplicationsForStudent;