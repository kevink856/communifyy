// Import dependencies
import "./styles/index.css";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

// Import pages
import App from "./App";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);

root.render(
    <RouterProvider
        router = {router}
    />
);