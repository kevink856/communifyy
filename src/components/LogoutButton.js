// Import dependencies
import "../styles/LogButton.css"
import { Link } from "react-router-dom";

/*
 * Component to logout by clearing token instances and redirecting to landing page
 */
const Logout = () => {
    return (
        <Link to = "/" style = {{ textDecoration: "none" }}>
            <button className = "Log-button"
                type = "button"
                onClick = {() => {
                    window.localStorage.removeItem("token");
                }}
            > Logout
            </button>
        </Link>
    );
}

export default Logout;