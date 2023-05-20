// Import dependencies
import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import pages
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";

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

root.render(
    <React.StrictMode>
        <RouterProvider
            router = {router}
        />
    </React.StrictMode>
);