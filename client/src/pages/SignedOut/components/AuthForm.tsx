import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../features/auth/useAuth";

type AuthFormType = "SIGNUP" | "LOGIN";

export const AuthForm = ({
  type,
  onCancel,
  onSubmit,
}: {
  type: AuthFormType;
  onCancel: () => void;
  onSubmit?: () => void;
}) => {
  const auth = useAuth();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = () => {
    createUserWithEmailAndPassword(
      auth,
      "theodore.moke@gmail.com",
      "dflkjasdf723rj&",
    )
      .then((userCredentials) => {
        console.log("userCredentials", userCredentials);
        onSubmit && onSubmit();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <form>
      <Box
        display="grid"
        gridTemplateColumns="max-content"
        justifyContent="center"
        gap={4}
      >
        <Box
          display="flex"
          flexDirection={isMdDown ? "column" : "row"}
          justifyContent="center"
          gap={2}
        >
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            autoFocus
          />
          <TextField fullWidth id="password" label="Password" type="password" />
        </Box>
        <Box
          display="flex"
          flexDirection={isMdDown ? "column-reverse" : "row"}
          justifyContent="flex-end"
          gap={2}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {type === "SIGNUP" ? "Sign Up" : "Login"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};
