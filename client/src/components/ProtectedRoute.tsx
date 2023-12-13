import React, { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (user == null) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
