// Import dependencies
import "../styles/LogButton.css"
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

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