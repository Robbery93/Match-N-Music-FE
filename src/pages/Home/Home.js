import React from 'react';
import './Home.css'

const Home = () => {

    return (
        <div className="page-container">
            <div className="page">
                <div className="left">
                    <div className="title">
                        <h1>Match &apos;n Music</h1>
                    </div>

                    <main className="intro_text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet animi autem beatae blanditiis corporis culpa dolor dolores ea eius est explicabo illum in ipsum itaque laborum, magnam minima molestiae molestias nam numquam odit, qui, repellat repudiandae sunt temporibus voluptates? A atque blanditiis corporis deserunt ex quibusdam quis voluptatibus.
                    </main>
                </div>
                <div className="right">
                    <div className="login-register-window">
                        <form>
                            <input type="text"
                                   placeholder="Gebruikersnaam"
                            />
                            <input
                                type="password"
                                placeholder="Wachtwoord"
                            />
                            <button
                                type="button"
                                className="login-btn"
                            >Login</button>
                        </form>

                        <div className="line"></div>

                        <button
                            type="button"
                            className="register-btn"
                        >Registreren</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;