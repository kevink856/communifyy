// Import dependencies
import "../styles/Home.css";

// Import components
import LogoutButton from "./LogoutButton";

const Home = (prop) => {
    return (
        <div className = "Home">
            <div className = "Home-header">
                <p>
                    This is current home page
                </p>
                <p>
                    Will show info here once you're logged in!
                </p>
                <div>
                    <LogoutButton setToken = {prop.setToken} />
                </div>
            </div>
        </div>
    );
}

export default Home;