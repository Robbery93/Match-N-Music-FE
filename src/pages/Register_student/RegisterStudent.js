import React from 'react';
import './RegisterStudent.css'
import ContactInformationField from "../../components/ContactInformationField/ContactInformationField";
import RequestField from "../../components/RequestField/RequestField";

const RegisterStudent = () => {
    return (
        <div className="register_student_page">
            <ContactInformationField />
            <RequestField />
        </div>
    );
};

export default RegisterStudent;