import { useState } from "react";
import {
  Alert,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [processing, setProcessing] = useState(false);
  const { auth } = useAuth();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async () => {
    setError(null);
    setProcessing(true);
    try {
      if (type === "SIGNUP") {
        await handleSignup();
      } else if (type === "LOGIN") {
        await handleLogin();
      } else {
        throw new Error(`Invalid auth type: ${type}`);
      }

      onSubmit && onSubmit();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setError(error.message);
      } else {
        console.error("An unknown error occurred");
        setError("An unknown error occurred");
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleSignup = () => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials: UserCredential) => {
        sendEmailVerification(userCredentials.user);
      },
    );
  };

  const handleLogin = () => {
    return signInWithEmailAndPassword(auth, email, password);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={processing}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={processing}
          />
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          display="flex"
          flexDirection={isMdDown ? "column-reverse" : "row"}
          justifyContent="flex-end"
          gap={2}
        >
          <Button onClick={onCancel} disabled={processing}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={email === "" || password === "" || processing}
          >
            {type === "SIGNUP" ? "Sign Up" : "Login"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};
