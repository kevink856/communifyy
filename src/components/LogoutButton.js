// Import dependencies
import "../styles/LogButton.css"
import { Link } from "react-router-dom";

const Logout = (prop) => {
    return (
        <Link to = "/">
            <button className = "Log-button"
                type = "button"
                onClick = {() => {
                    prop.setToken("");
                    window.localStorage.removeItem("token");
                }}
            > Logout
            </button>
        </Link>
    );
}

export default Logout;