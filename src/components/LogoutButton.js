import "../styles/LogButton.css"

const Logout = (prop) => {
    return (
        <button class = "log-button"
            type = "button"
            onClick = {() => {
                prop.setToken("");
                window.localStorage.removeItem("token");
            }}
        > Logout
        </button>
    );
}

export default Logout;