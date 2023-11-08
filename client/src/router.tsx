import { createBrowserRouter } from "react-router-dom";
import { League, Leagues } from "./pages/Leagues";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Leagues />,
    },
    {
        path: '/league/:leagueId',
        element: <League />
    }
])
