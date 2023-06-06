// Import dependencies
import "../styles/Home.css";
import { useEffect, useState } from "react";

// Import components
import LogoutButton from "./LogoutButton";

/*
 * Component that holds entire single-page application
 */
const Home = () => {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [pfp, setPfp] = useState("");
    const [user_id, setUser_id] = useState("");
    const [topsongs, setTopsongs] = useState("");
    const [topartists, setTopartists] = useState("");

    // Run and parse token from URL whenever "token" changes
    useEffect(() => {
        const hash = window.location.hash;

        if(!token && hash) {
            setToken(hash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1]);
            window.location.hash = "";
        }
    
        // Fetch specific user info
        const fetchData = async () => {
            // Gets user's profile data
            const result = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            });
            const profile = await result.json();
            setUsername(profile.display_name);
            setPfp(profile.images[0].url);
            setUser_id(profile.id);
    
            // Gets user's top songs and artists
            // result = await fetch("https://api.spotify.com/v1/me/top", {
            //     method: "GET", headers: { Authorization: `Bearer ${token}` }
            // });
            // const top = await result.json();
        };

        fetchData();
    }, [token]);

    // Run whenever "user_id" changes
    useEffect(() => {
        const postTop = async () => {
            await fetch(`${process.env.REACT_APP_BASE_URL}/top`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    user_id, topsongs: topsongs.split(","), topartists: topartists.split(",")
                })
            }).then(resp => resp.json());
        };

        postTop();
    }, [user_id]);

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