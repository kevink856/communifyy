// Import dependencies
import "../styles/LogButton.css"

// Declare consts for Oauth2 link formatting
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "https://kevink856.github.io/communifyy/home";
const RESPONSE_TYPE = "token";
const SCOPE = "user-top-read";

/*
 * Component to login by redirecting to Spotify's authentication endpoint, then back to app
 */
const LoginButton = () => {
    return (
        <button className = "Log-button"
            type = "button"
            onClick = {() => {
                window.location.href = `${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;
            }}
        > Login to Spotify
        </button>
    );
}

export default LoginButton;