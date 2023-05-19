const Logout = (props) => {
    return (
        <button
            type = "button"
            onClick = {() => {
                props.setToken("");
                window.localStorage.removeItem("token");
            }}
        > Logout
        </button>
    );
}

export default Logout;