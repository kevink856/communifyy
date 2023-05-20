// Import dependencies
import "./styles/App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes, useNavigate } from "react-router-dom";

// Import pages
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

function App() {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    // Parse user token on login
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if(!token && hash) {
            token = hash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }
        setToken(token);
    }, [token]);

    return (
        <div className = "App">
            <BrowserRouter>
                <Router>
                    <Routes>
                        <Route path = "/" element = {<LandingPage />} />
                        <Route path = "/home" element = {<Home setToken = {setToken}/>} />
                    </Routes>
                </Router>
            </BrowserRouter>
        </div>
    );
}

export default App;