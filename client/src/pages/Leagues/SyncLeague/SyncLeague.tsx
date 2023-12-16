import React from "react";
import { Typography } from "@mui/material";
import { Layout } from "../../../components/Layout";
import { useAuth } from "../../../features/auth/useAuth";
import { useUserLeaguesFFQuery } from "../../../features/external/fleaflicker/useUserLeagues";
import { SyncLeagueForm } from "./SyncLeagueForm";
import { useNavigate } from "react-router-dom";

export const SyncLeague = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useUserLeaguesFFQuery({
    email: user?.email ?? undefined,
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Layout title="Sync Leagues">
      <Typography variant="body1">
        Checking Fleaflicker for leagues from:{" "}
        <span
          style={{
            background: "#333",
            fontFamily: "monospace",
            padding: "4px 8px",
          }}
        >
          {user?.email}
        </span>
      </Typography>
      {data && (
        <SyncLeagueForm data={data} onComplete={() => navigate("/leagues")} />
      )}
    </Layout>
  );
};
