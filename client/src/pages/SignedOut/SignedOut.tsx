import React from "react";
import { Button } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const SignedOut = () => {
  const auth = getAuth();

  const handleSignup = () => {
    console.log('auth', auth)
    createUserWithEmailAndPassword(auth, "theodore.moke@gmail.com", "1234")
      .then((userCredentials) => {
        console.log("userCredentials", userCredentials);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <div>
      <Button onClick={handleSignup}>Sign Up</Button>
    </div>
  );
};
