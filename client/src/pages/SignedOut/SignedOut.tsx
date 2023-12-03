import { useState } from "react";
import { Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../features/auth/useAuth";

export const SignedOut = () => {
  const auth = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSignup = () => {
    setIsProcessing(true);
    
    createUserWithEmailAndPassword(
      auth,
      "theodore.moke@gmail.com",
      "dflkjasdf723rj&",
    )
      .then((userCredentials) => {
        console.log("userCredentials", userCredentials);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };
  return (
    <div>
      <Button disabled={isProcessing} onClick={handleSignup}>Sign Up</Button>
    </div>
  );
};
