import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { League, Leagues, SyncLeague, DeleteLeague } from "./pages/Leagues";
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
          path="/leagues"
          element={
            <ProtectedRoute>
              <Leagues />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leagues/:leagueId"
          element={
            <ProtectedRoute>
              <League />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leagues/:leagueId/delete"
          element={
            <ProtectedRoute>
              <DeleteLeague />
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
