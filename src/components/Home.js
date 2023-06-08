// Import dependencies
import "../styles/Home.css";
import { useEffect, useState } from "react";

// Import components
import LogoutButton from "./LogoutButton";

// Control data size
const TOP_SIZE = 50;
const MAX_ARTISTS_PER_SONG = 4;

/*
 * Component that holds entire single-page application
 */
const Home = () => {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [pfp, setPfp] = useState("");
    const [user_id, setUser_id] = useState("");
    const [top_songs, setTop_songs] = useState([]);
    const [top_artists, setTop_artists] = useState([]);

    // Run and parse token from URL whenever "token" changes
    useEffect(() => {
        const hash = window.location.hash;

        if(!token && hash) {
            setToken(hash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1]);
            window.location.hash = "";
        }
    
        // Fetch specific user info
        const fetchData = async () => {
            const result_profile = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }})
                .then((response) => response.json());

            const result_top_songs = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${TOP_SIZE}`, {
                method: "GET", headers: { Authorization: `Bearer ${token}` }})
                .then((response) => response.json());

            const result_top_artists = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=${TOP_SIZE}`, {
                method: "GET", headers: { Authorization: `Bearer ${token}` }})
                .then((response) => response.json());

            //Structure user's profile data
            setUsername(result_profile.display_name);
            setUser_id(result_profile.id);
            if(result_profile.images.length > 0) {
                setPfp(result_profile.images[0].url);
            }
    
            // Structure user's top songs data
            let arr_songs = new Array(TOP_SIZE);
            for(let i=0; i<arr_songs.length && i<result_top_songs.items.length; i++) {
                let arr_artists = new Array(MAX_ARTISTS_PER_SONG);
                for(let j=0; j<result_top_songs.items[i].artists.length && j<arr_artists.length; j++) {
                    arr_artists[j] = result_top_songs.items[i].artists[j].name;
                }
                arr_songs[i] = JSON.stringify({
                    name: result_top_songs.items[i].name,
                    popularity: result_top_songs.items[i].popularity,
                    image: result_top_songs.items[i].album.images[0].url,
                    artists: arr_artists
                });
            }
            setTop_songs(arr_songs); 

            // Structure user's top artists data
            let arr_artists = new Array(TOP_SIZE);
            for(let i=0; i<arr_artists.length && i<result_top_artists.items.length; i++) {
                arr_artists[i] = JSON.stringify({
                    name: result_top_artists.items[i].name,
                    popularity: result_top_artists.items[i].popularity,
                    image: result_top_artists.items[i].images[0].url,
                    genres: result_top_artists.items[i].genres
                });
            }
            setTop_artists(arr_artists); 
        };
        fetchData();
    }, [token]);

    // Run whenever "top_artists" changes
    useEffect(() => {
        const postTop = async () => {
            await fetch(`${process.env.REACT_APP_BASE_URL}/top`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    user_id,
                    top_songs: top_songs,
                    top_artists: top_artists
                })
            }).then(resp => resp.json());
        };
        if(user_id.length > 0 && top_songs.length > 0 && top_artists.length > 0) {
            postTop();
        }
    }, [top_artists]);

    return (
        <div className = "Home">
            <header className = "Home-header">
                <img src = {pfp} onerror = "this.src = ../data/no_profile.webp" alt = "Profile" />
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