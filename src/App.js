// Import dependencies
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";

// Import components
import LoginButton from "./components/LoginButton";

// Import pages
import Home from "./Home";

function App() {
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
            <Routes>
                <Route path = "/" element = {<App />} exact = {true}/>
                <Route path = "/home" element = {<Home />}/>
            </Routes>
        </div>
    );
}

export default App;