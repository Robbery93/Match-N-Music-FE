import React from "react";
import './App.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import AvailableTeachers from "./pages/StudentProfile/AvailableTeachers/AvailableTeachers";
import StudentApplications from "./pages/TeacherProfile/StudentApplications/StudentApplications";
import MatchPage from "./pages/MatchPage/MatchPage";
import RegisterStudent from "./pages/RegisterStudent/RegisterStudent";
import RegisterTeacher from "./pages/RegisterTeacher/RegisterTeacher";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import NotFound from "./pages/NotFound/NotFound";
import PageWrapper from "./components/StylingElements/PageWrapper/PageWrapper";
import StudentProfile from "./pages/StudentProfile/StudentProfile";
import ActiveApplicationsForStudent
    from "./pages/StudentProfile/ActiveApplicationsForStudent/ActiveApplicationsForStudent";
import TeacherProfile from "./pages/TeacherProfile/TeacherProfile";
import AllActiveLessons from "./pages/TeacherProfile/AllActiveLessons/AllActiveLessons";

function App() {

  return (
      <>
          <NavBar />
          <PageWrapper>
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route path="/register">
                  <RegisterUser />
              </Route>
              <Route path="/newstudent">
                  <RegisterStudent />
              </Route>
              <Route path="/newteacher">
                  <RegisterTeacher />
              </Route>
              <Route path="/studentprofile/:id">
                  <StudentProfile />
              </Route>
              <Route path="/availableteachers">
                  <AvailableTeachers />
              </Route>
              <Route path="/activeapplications">
                  <ActiveApplicationsForStudent />
              </Route>
              <Route path="/teacherprofile/:id">
                  <TeacherProfile />
              </Route>
              <Route path="/activelessons">
                  <AllActiveLessons />
              </Route>
              <Route path="/studentapplications">
                  <StudentApplications />
              </Route>
              <Route path="/matchpage">
                  <MatchPage />
              </Route>
              <Route path="*">
                  <NotFound />
              </Route>
          </Switch>
          </PageWrapper>
      </>
  );
}

export default App;
