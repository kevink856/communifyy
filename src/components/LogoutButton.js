// Import dependencies
import "../styles/LogButton.css"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Logout = (prop) => {
    return (
        <Button className = "Log-button"
            onClick = {() => {
                prop.setToken("");
                window.localStorage.removeItem("token");
                useNavigate("/");
            }}
        > Logout
        </Button>
    );
}

export default Logout;