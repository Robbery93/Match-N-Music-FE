import React from "react";
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import RegisterStudent from "./pages/RegisterStudent/RegisterStudent";
import NavBar from "./components/NavBar/NavBar";
import RegisterTeacher from "./pages/RegisterTeacher/RegisterTeacher";
import AvailableTeachers from "./pages/AvailableTeachers/AvailableTeachers";
import StudentApplications from "./pages/StudentApplications/StudentApplications";
import MatchPage from "./pages/MatchPage/MatchPage";

function App() {

  return (
    <>
        <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registerstudent" element={<RegisterStudent />} />
                <Route path="/availableteachers" element={<AvailableTeachers />} />
                <Route path="/registerteacher" element={<RegisterTeacher />} />
                <Route path="/studentapplications" element={<StudentApplications />} />
                <Route path="/matchpage" element={<MatchPage />} />
            </Routes>
    </>
  );
}

export default App;
