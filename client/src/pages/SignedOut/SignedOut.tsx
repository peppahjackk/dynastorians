import { useState } from "react";
import { Button } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AuthForm } from "./components/AuthForm";

const VIEWS = {
  SIGNUP: "SIGNUP",
  LOGIN: "LOGIN",
  DEFAULT: "DEFAULT",
};

export const SignedOut = () => {
  const [view, setView] = useState(VIEWS.DEFAULT);

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
      {view === VIEWS.SIGNUP ? (
        <Grid item xs={12} md={6}>
          <AuthForm type="SIGNUP" onCancel={() => setView(VIEWS.DEFAULT)} />
        </Grid>
      ) : view === VIEWS.LOGIN ? (
        <Grid item xs={12} md={6}>
          <AuthForm type="LOGIN" onCancel={() => setView(VIEWS.DEFAULT)} />
        </Grid>
      ) : (
        <>
          <Grid item xs={12} md={3}>
            <Box display="flex" justifyContent="center">
              <Button onClick={() => setView(VIEWS.LOGIN)}>Login</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" onClick={() => setView(VIEWS.SIGNUP)}>
                Sign Up
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};
