import React from 'react';
import "./PageWrapper.css";

const PageWrapper = ( { children }) => {
    return (
        <main className="wrapper">
            {children}
            <div className="white-space"></div>
        </main>
    );
};

export default PageWrapper;