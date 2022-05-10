import React from "react";
import './App.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import AvailableTeachers from "./pages/AvailableTeachers/AvailableTeachers";
import StudentApplications from "./pages/StudentApplications/StudentApplications";
import MatchPage from "./pages/MatchPage/MatchPage";
import RegisterStudent from "./pages/RegisterStudent/RegisterStudent";
import RegisterTeacher from "./pages/RegisterTeacher/RegisterTeacher";

function App() {

  return (
    <>
        <NavBar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/registerstudent">
                    <RegisterStudent />
                </Route>
                <Route path="/registerteacher">
                    <RegisterTeacher />
                </Route>
                <Route path="/availableteachers">
                    <AvailableTeachers />
                </Route>
                <Route path="/studentapplications">
                    <StudentApplications />
                </Route>
                <Route path="/matchpage">
                    <MatchPage />
                </Route>
                <Route path="*">
                    {/* NotFound component toevoegen */}
                </Route>
            </Switch>
    </>
  );
}

export default App;
