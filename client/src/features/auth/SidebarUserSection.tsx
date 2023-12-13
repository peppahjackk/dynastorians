import React from "react";
import { useAuth } from "./useAuth";
import { signOut } from "firebase/auth";
import { Button, Skeleton } from "@mui/material";

export const SidebarUserSection = () => {
  const { auth } = useAuth();

  if (auth?.currentUser == null) {
    console.log("no auth", auth.currentUser);
    return <Skeleton variant="rectangular" width={200} height={100} />;
  }

  console.log("auth", auth.currentUser);

  return (
    <div>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </div>
  );
};
