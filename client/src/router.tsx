import { createBrowserRouter } from "react-router-dom";
import { League } from "./pages/League";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: '/league/:leagueId',
        element: <League />
    }
])
