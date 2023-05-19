// Import dependencies
import "./styles/App.css";
import { useEffect, useState } from 'react';

// Import components
import LogoutButton from "./components/LogoutButton";

function App() {
    const [token, setToken] = useState("");

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
        <div className = "Home">
            <div className = "Home-header">
                <p>
                    This is current home page
                </p>
                <p>
                    Will show info here once you're logged in!
                </p>
                <div>
                    <LogoutButton setToken={setToken} />
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Home;