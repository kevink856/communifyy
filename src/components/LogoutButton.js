// Import dependencies
import "../styles/LogButton.css"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Logout = (prop) => {
    return (
        <Button className = "Log-button"
            component = {Link}
            to = "../"
            onClick = {() => {
                prop.setToken("");
                window.localStorage.removeItem("token");
            }}
        > Logout
        </Button>
    );
}

export default Logout;