import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import RegisterStudent from "./pages/RegisterStudent/RegisterStudent";
import NavBar from "./components/NavBar/NavBar";
import RegisterTeacher from "./pages/RegisterTeacher/RegisterTeacher";

function App() {

  return (
    <>
        <NavBar />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registerstudent" element={<RegisterStudent />} />
                <Route path="/registerteacher" element={<RegisterTeacher />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
