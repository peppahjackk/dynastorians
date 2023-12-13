import React from "react";
import { useAuth } from "./useAuth";
import { signOut } from "firebase/auth";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const SidebarUserSection = () => {
  const { auth, user } = useAuth();

  if (user == null) {
    return <Skeleton variant="rectangular" width={200} height={100} />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      px={1}
      py={2}
      alignItems="center"
      gap={2}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <AccountCircleIcon />
        <Typography variant="body1">{user.email}</Typography>
      </Stack>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </Box>
  );
};
