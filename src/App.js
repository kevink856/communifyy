// Import dependencies
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import components
import LoginButton from "./components/LoginButton";

// Import pages
import Home from "./Home";

function App() {
    return (
        <div className = "App">
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<App />} />
                    <Route path = "/home" element = {<Home />} />
                </Routes>
            </BrowserRouter>
            { /* <Redirect to = "/" /> */ }
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