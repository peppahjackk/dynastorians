import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../../features/auth/useAuth";

const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/users/signup", {
    email,
    password,
  });

  return response.data;
};

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/users/signin", {
    email,
    password,
  });

  return response.data;
};

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
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { setUser } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setProcessing(true);
    try {
      if (type === "SIGNUP") {
        const user = await handleSignup();
        setUser(user);
      } else if (type === "LOGIN") {
        const user = await handleLogin();
        setUser(user);
      } else {
        throw new Error(`Invalid auth type: ${type}`);
      }

      onSubmit && onSubmit();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setError(error.response?.data?.message ?? error.message);
      } else {
        console.error("An unknown error occurred");
        setError("An unknown error occurred");
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleSignup = () => {
    return signUp({ email, password });
  };

  const handleLogin = () => {
    return signIn({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
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
            type="submit"
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
