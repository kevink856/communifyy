// Import dependencies
import "../styles/Home.css";
import { useEffect, useState } from "react";

// Import components
import LogoutButton from "./LogoutButton";

/* 
 * Asynchronously fetch API call
 * - Gets user's profile data
 */ 
async function fetchData(token, props) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    const profile = await result.json();
    props.setUsername(profile.display_name);
    props.setPfp(profile.images[0].url);
    props.setId(profile.id);
}

/*
 * Component that holds entire single-page application
 */
const Home = () => {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [pfp, setPfp] = useState("");
    const [id, setId] = useState("");

    // Run and parse token from URL whenever "token" changes
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

    // Fetch necessary user info
    fetchData(token, { setUsername, setPfp, setId });

    return (
        <div className = "Home">
            <header className = "Home-header">
                <img src = {pfp} alt = "Profile" />
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