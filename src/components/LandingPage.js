// Import dependencies
import "../styles/LandingPage.css";

// Import components
import LoginButton from "./LoginButton";

/*
 * Front Component that shows intro and login button
 */
const LandingPage = () => {
    return (
        <div className = "LandingPage">
            <header className = "LandingPage-header">
                <p className = "LandingPage-title">
                    communifyy
                </p>
                <p>
                    Landing Page - More info here
                </p>
                <div>
                    <LoginButton />
                </div>
            </header>
        </div>
    );
}

export default LandingPage;