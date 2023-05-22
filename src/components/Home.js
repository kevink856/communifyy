// Import dependencies
import "../styles/Home.css";
import { useEffect, useState } from "react";

// Import components
import LogoutButton from "./LogoutButton";

async function fetchProfile(token, props) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    const profile = await result.json();
    props.setUsername(profile.display_name);
    props.setPfp(profile.images[0].url);
}

const Home = () => {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [pfp, setPfp] = useState("");

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

    fetchProfile(token, {setUsername, setPfp});

    return (
        <div className = "Home">
            <header className = "Home-header">
                <img src = {pfp} alt = "Profile Picture" />
                <p>
                    username: { username }
                </p>
                <p>
                    more info soon
                </p>
                <div>
                    <LogoutButton setToken = {setToken} />
                </div>
            </header>
        </div>
    );
}

export default Home;