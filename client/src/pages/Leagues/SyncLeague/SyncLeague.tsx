import React from "react";
import {
  Typography,
} from "@mui/material";
import { Layout } from "../../../components/Layout";
import { useAuth } from "../../../features/auth/useAuth";
import { useUserLeaguesFFQuery } from "../../../features/external/fleaflicker/useUserLeagues";
import { SyncLeagueForm } from "./SyncLeagueForm";

export const SyncLeague = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useUserLeaguesFFQuery({
    email: user?.email ?? undefined,
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Layout title="Fleaflicker Leagues">
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
      {data && <SyncLeagueForm data={data} />}
    </Layout>
  );
};
