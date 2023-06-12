// Import dependencies
import "../styles/Home.css";
import { useEffect, useState } from "react";
import DefaultPfp from "../data/no_profile.webp";

// Import components
import LogoutButton from "./LogoutButton";
import LoadingPage from "./LoadingPage";
import LeftSlider from "./LeftSlider";
import RightSlider from "./RightSlider";

// Control data size
const TOP_SIZE = 50;
const MAX_ARTISTS_PER_SONG = 4;
const MAX_GENRE_COUNT = 5;

/*
 * Component that holds entire single-page application
 */
const Home = () => {
    const [token, setToken] = useState("");
    const [pfp, setPfp] = useState("");
    const [user_id, setUser_id] = useState("");
    const [song_pop, setSong_pop] = useState(0);
    const [artist_pop, setArtist_pop] = useState(0);
    const [top_songs, setTop_songs] = useState([]);
    const [top_artists, setTop_artists] = useState([]);
    const [top_genres, setTop_genres] = useState([]);
    const [artist_count, setArtist_count] = useState(0);
    const [song_count, setSong_count] = useState(0);
    const [artist_slider, setArtist_slider] = useState(0);
    const [song_slider, setSong_slider] = useState(0);

    // Run and parse token from URL whenever "token" changes
    useEffect(() => {
        setToken(window.localStorage.getItem("token"));
        const hash = window.location.hash;
        
        if(!token && hash) {
            window.localStorage.setItem("token", hash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1]);
            window.location.hash = "";
            setToken(window.localStorage.getItem("token"));
        }

        // Fetch user's profile data
        const fetchData = async () => {
            const result_profile = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }})
                .then((response) => response.json());

            //Structure user's profile data
            setUser_id(result_profile.id);
            result_profile.images.length > 0 ? setPfp(result_profile.images[0].url) : setPfp(DefaultPfp);
        }

        // Fetch user's top data
        const fetchTopData = async () => {
            const result_top_songs = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${TOP_SIZE}`, {
                method: "GET", headers: { Authorization: `Bearer ${token}` }})
                .then((response) => response.json());

            const result_top_artists = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=${TOP_SIZE}`, {
                method: "GET", headers: { Authorization: `Bearer ${token}` }})
                .then((response) => response.json());

            // Structure user's top songs data
            let arr_songs = new Array(TOP_SIZE);
            let temp_song_pop = 0;
            for(let i=0; i<arr_songs.length && i<result_top_songs.items.length; i++) {
                let arr_artists = new Array(MAX_ARTISTS_PER_SONG);
                const song = result_top_songs.items[i];
                for(let j=0; j<song.artists.length && j<arr_artists.length; j++) {
                    arr_artists[j] = song.artists[j].name;
                }
                arr_songs[i] = JSON.stringify({
                    name: song.name,
                    popularity: song.popularity,
                    image: song.album.images[0].url,
                    artists: arr_artists
                }, null, "\t");
                temp_song_pop += song.popularity;
            }
            setTop_songs(arr_songs); 
            setSong_pop(temp_song_pop / TOP_SIZE);

            // Structure user's top artists data
            let arr_artists = new Array(TOP_SIZE);
            let temp_artist_pop = 0;
            const genre_count = new Map();
            for(let i=0; i<arr_artists.length && i<result_top_artists.items.length; i++) {
                const artist = result_top_artists.items[i];
                arr_artists[i] = JSON.stringify({
                    name: artist.name,
                    popularity: artist.popularity,
                    image: artist.images[0].url,
                    genres: artist.genres
                }, null, "\t");
                artist.genres.forEach((genre) => {
                    genre_count.get(genre) ? genre_count.set(genre, genre_count.get(genre)+1) : genre_count.set(genre, 1);
                });
                temp_artist_pop += artist.popularity;
            }
            setTop_artists(arr_artists);
            setArtist_pop(temp_artist_pop / TOP_SIZE);

            const top_genres_arr = new Array(MAX_GENRE_COUNT);
            const genres_sorted = new Map([...genre_count].sort((a, b) => {
                return b[1] - a[1];
            }));
            const iterator = genres_sorted.keys();
            for(let i=0; i<top_genres_arr.length; i++) {
                top_genres_arr[i] = iterator.next().value;
            }
            setTop_genres(top_genres_arr);
        }
        
        fetchData();
        if(token) { fetchTopData(); }
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
                    _id: user_id,
                    top_songs: top_songs,
                    top_artists: top_artists
                })
            }).then(resp => resp.json());
        }
        if(user_id.length > 0 && top_songs.length > 0 && top_artists.length > 0) {
            postTop();
        }
    }, [top_artists]);

    const loadArtists = () => {
        const artist = JSON.parse(top_artists[artist_slider]);
        return (
            <div className = "Home-body">
                <LeftSlider slider = {artist_slider} setSlider = {setArtist_slider} />
                <div className = "Home-artists">
                    <img style = {{ width: 250, height: 250 }} src = { artist.image } alt = "" />
                </div>
                <RightSlider slider = {artist_slider} setSlider = {setArtist_slider} />
            </div>
        );
    }

    const loadArtistData = () => {
        const container = [];
        const artist = JSON.parse(top_artists[artist_slider]);
        container.push(
            <div className = "Home-artist-data">
                <p style = {{ fontWeight: "bold" }}>{ artist.name }</p>
                <p>Your top artists are { artist_pop }% popular</p>
                <p>{ artist_count } other users also have { artist.name } in their Top 5 Artists</p>
            </div>
        );
        return container;
    }

    const loadSongs = () => {
        const song = JSON.parse(top_songs[song_slider]);
        return (
            <div className = "Home-body">
                <LeftSlider slider = {song_slider} setSlider = {setSong_slider} />
                <div className = "Home-songs">
                    <img style = {{ width: 250, height: 250 }} src = { song.image } alt = "" />
                </div>
                <RightSlider slider = {song_slider} setSlider = {setSong_slider} />
            </div>
        );
    }

    const loadSongData = () => {
        const container = [];
        const song = JSON.parse(top_songs[song_slider]);
        container.push(
            <div className = "Home-song-data">
                <p style = {{ fontWeight: "bold" }}>{ song.name }</p>
                <p>Your top genres are: { top_genres[0] }, { top_genres[1] }, and { top_genres[2] }</p>
                <p>Your top artists are { song_pop }% popular</p>
                <p>{ song_count } other users also have { song.name } in their Top 5 Songs</p>
            </div>
        );
        return container;
    }

    // Return loading page until top_artists is not null
    return top_artists.length > 0 ? (
        <div className = "Home">
            <ul>
                <li><img style = {{ width: 60, height: 60, paddingLeft: "30px" }} src = { pfp } alt = "" /></li>
                <li style = {{ paddingRight: "30px" }}><LogoutButton /></li>
            </ul>
            <header className = "Home-header" style = {{ marginTop: "80px" }}>
                <p>Your Top 5 Artists<br />#{ artist_slider+1 }:</p>
                { loadArtists() }
                { loadArtistData() }
            </header>
            <p style = {{ height: "100px" }}></p>
            <header className = "Home-header">
                <p>Your Top 5 Songs<br />#{ song_slider+1 }:</p>
                { loadSongs() }
                { loadSongData() }
            </header>
        </div>
    ) : <LoadingPage />;
}

export default Home;