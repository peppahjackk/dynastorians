import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { League, Leagues, SyncLeague } from "./pages/Leagues";
import { SignedOut } from "./pages/SignedOut";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Leagues />
            </ProtectedRoute>
          }
        />
        <Route
          path="/league/:leagueId"
          element={
            <ProtectedRoute>
              <League />
            </ProtectedRoute>
          }
        />
          <Route
            path="/league/sync"
            element={
              <ProtectedRoute>
                <SyncLeague />
              </ProtectedRoute>
            }
          />
        <Route path="/login" element={<SignedOut />} />
        {/* Add more protected routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
