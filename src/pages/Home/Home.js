import React, {useState} from 'react';
import './Home.css'
import {useNavigate} from "react-router";

const Home = () => {



    // useState
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="page-container">
            <div className="page">
                <div className="left">
                    <div className="title">
                        <h1>Onze missie</h1>
                    </div>

                    <main className="intro_text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet animi autem beatae blanditiis corporis culpa dolor dolores ea eius est explicabo illum in ipsum itaque laborum, magnam minima molestiae molestias nam numquam odit, qui, repellat repudiandae sunt temporibus voluptates? A atque blanditiis corporis deserunt ex quibusdam quis voluptatibus.
                    </main>
                </div>
                <div className="right">
                    <div className="login-register-window">
                        <form>
                            <input type="text"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                                   placeholder="Gebruikersnaam"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Wachtwoord"
                            />
                            <button
                                type="button"
                                className="login-btn"
                            >Login</button>
                        </form>

                        <div className="line"></div>

                        <div>
                        <button
                            type="button"
                            className="register-btn"
                            onClick={() => navigate("/registerstudent")}
                        >Student</button>

                        <button
                            type="button"
                            className="register-btn"
                            onClick={() => navigate("/registerteacher")}
                        >Docent</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;