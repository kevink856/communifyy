// Import dependencies
import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import pages
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";

// Create router to redirect by refreshing (HashRouting is not supported for GitHub Pages)
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/home",
        element: <Home />,
    },],
    {
        basename: "/communifyy",
    },
);

// Render entire app, and use StrictMode to prevent bad compiling
root.render(
    <React.StrictMode>
        <RouterProvider
            router = {router}
        />
    </React.StrictMode>
);