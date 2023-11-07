import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { League } from "./pages/League";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: '/league/:leagueId',
        element: <League />
    }
])
