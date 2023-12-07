import { useState } from "react";
import { Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../features/auth/useAuth";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

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

  const handleLogin = () => {};

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="space-around"
      spacing={6}
      padding={2}
    >
      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="h2">Dynastorians</Typography>
          <Typography variant="body1" textAlign="center">
            Ever wondered what the highest score in your dynasty league was? Or
            who your biggest rival is? Sign up to find out!
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box display="flex" justifyContent="center">
          <Button disabled={isProcessing} onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            disabled={isProcessing}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
