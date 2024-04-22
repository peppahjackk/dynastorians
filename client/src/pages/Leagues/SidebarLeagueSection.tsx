import React from "react";
import { useAuth } from "../../features/auth/useAuth";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useLeaguesQuery } from "./queries/useLeaguesQuery";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarLeagueSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoading, error, data } = useLeaguesQuery({ userId: user?._id });

  if (isLoading) {
    return <Skeleton variant="rectangular" width={200} height={100} />;
  }

  if (error || !data) {
    return null;
  }

  return (
    <>
      {data.map((league) => {
        return (
          <ListItem disablePadding>
            <ListItemButton
              key={league._id}
              onClick={() => navigate(`/leagues/${league._id}`)}
              sx={{
                paddingLeft: "32px",
                background: pathname.includes(league._id) ? "#242424" : null,
              }}
            >
              <ListItemText primary={league.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/league/sync")} sx={{textAlign: "center", color: 'rgb(144, 202, 249)'}}>
          <ListItemText>+ Sync New League</ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
};
