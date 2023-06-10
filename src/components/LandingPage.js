// Import dependencies
import "../styles/LandingPage.css";
import DefaultPfp from "../data/no_profile.webp";

// Import components
import LoginButton from "./LoginButton";

/*
 * Front Component that shows intro and login button
 */
const LandingPage = () => {
    return (
        <div className = "LandingPage">
            <ul>
                <li><img style = {{ width: 60, height: 60, paddingLeft: "30px" }} src = { DefaultPfp } alt = "" /></li>
                <li style = {{ paddingRight: "30px" }}><LoginButton /></li>
            </ul>
            <header className = "LandingPage-header">
                <p className = "LandingPage-title">
                    communifyy
                </p>
            </header>
        </div>
    );
}

export default LandingPage;