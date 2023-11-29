import { createBrowserRouter } from "react-router-dom";
import { League, Leagues } from "./pages/Leagues";
import { SignedOut } from './pages/SignedOut'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Leagues />,
  },
  {
    path: "/login",
    element: <SignedOut />,
  },
  {
    path: "/league/:leagueId",
    element: <League />,
  },
]);
