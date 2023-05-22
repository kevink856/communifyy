// Import dependencies
import "../styles/LogButton.css"

// ENV
require ("dotenv").config();

// Declare consts for Oauth link formatting
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "https://kevink856.github.io/communifyy/home";
const RESPONSE_TYPE = "token"

/*
 * Component to login by redirecting to Spotify's authentication endpoint, then back to app
 */
const LoginButton = () => {
    return (
        <button className = "Log-button"
            type = "button"
            onClick = {() => {
                window.location.href = `${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${process.env.CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
            }}
        > Login to Spotify
        </button>
    );
}

export default LoginButton;