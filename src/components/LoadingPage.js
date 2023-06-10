// Import dependencies
import "../styles/LandingPage.css";

/*
 * Component that serves as proxy before API calls finish
 */
const LoadingPage = () => {
    return (
        <div className = "LoadingPage">
            <p>
                Loading...
            </p>
        </div>
    );
}

export default LoadingPage;