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
    const [id, setId] = useState("");
    const [topsongs, setTopsongs] = useState("");
    const [topartists, setTopartists] = useState("");

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

    const fetchData = async () => {
        // Gets user's profile data
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
        const profile = await result.json();
        setUsername(profile.display_name);
        setPfp(profile.images[0].url);
        setId(profile.id);

        // Gets user's top songs and artists
        result = await fetch("https://api.spotify.com/v1/me/top", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
        const top = await result.json();
    }

    const postTop = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/top`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id, topsongs: topsongs.split(","), topartists: topartists.split(",")
            })
        }).then(resp => resp.json());
        setId("");
        setTopsongs("");
        setTopartists("");
    }

    // Fetch necessary user info
    fetchData();

    // Post user's top 5 songs
    postTop();

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