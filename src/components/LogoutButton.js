const Logout = (setToken) => {
    return (
        <button
            type = "button"
            onClick = {() => {
                setToken("");
                window.localStorage.removeItem("token");
            }}
        > Logout
        </button>
    );
}

export default Logout;