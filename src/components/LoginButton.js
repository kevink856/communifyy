import "../styles/LogButton.css"

const CLIENT_ID = "3f8575d48b8048139be97f96b54f41ad";
const REDIRECT_URI = "https://kevink856.github.io/communifyy/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const LoginButton = () => {
    return (
        <button class = "log-button"
            type = "button"
            onClick = {() => {
                window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
            }}
        > Login to Spotify
        </button>
    );
}

export default LoginButton;