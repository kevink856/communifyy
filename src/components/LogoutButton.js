// Import dependencies
import "../styles/LogButton.css"
import { useNavigate } from "react-router-dom";

const Logout = (prop) => {
    const navigate = useNavigate();

    return (
        <button className = "Log-button"
            type = "button"
            onClick = {() => {
                prop.setToken("");
                window.localStorage.removeItem("token");
                navigate("/LandingPage");
            }}
        > Logout
        </button>
    );
}

export default Logout;