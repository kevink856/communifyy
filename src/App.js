// Import dependencies
import "./styles/App.css";

// Import components
import LoginButton from "./components/LoginButton";

const App = () => {
    return (
        <div className = "App">
            <header className = "App-header">
                <p className = "App-title">
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

export default App;