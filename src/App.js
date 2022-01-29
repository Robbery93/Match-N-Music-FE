import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import RegisterStudent from "./pages/Register_student/RegisterStudent";
import NavBar from "./components/NavBar/NavBar";

function App() {

  return (
    <>
        <NavBar />
        <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerstudent" element={<RegisterStudent />} />
      </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
