// Import dependencies
import "../styles/LogButton.css"
import { Link } from "react-router-dom";

/*
 * Component to logout by clearing token instances and redirecting to landing page
 */
const Logout = (prop) => {
    return (
        <Link to = "/" style = {{ textDecoration: "none" }}>
            <button className = "Log-button"
                type = "button"
                onClick = {() => {
                    prop.setToken("");
                }}
            > Logout
            </button>
        </Link>
    );
}

export default Logout;