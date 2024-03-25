import React from "react";
import { useParams } from "react-router";
import { Layout } from "../../components/Layout";
import { useLeagueQuery } from "./queries/useLeagueQuery";
import { Button, Stack, Typography } from "@mui/material";
import { useDeleteLeagueMutation } from "./queries/useDeleteLeagueMutation";

export const DeleteLeague = () => {
  const { leagueId } = useParams();

  const { data, isLoading, error } = useLeagueQuery({ id: leagueId });

  const deleteLeague = useDeleteLeagueMutation();

  if (isLoading) {
    return <div></div>;
  }

  if (error || !leagueId) {
    return (
      <div>
        {error
          ? error.message
          : !leagueId
          ? "No league id"
          : "Something went wrong"}
      </div>
    );
  }

  if (data == null) {
    return <div>no data</div>;
  }

  return (
    <Layout title={data.name}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h5">
          Deleting a league is not reversible. Please make sure you would like
          to delete:         <span
          style={{
            background: "#333",
            fontFamily: "monospace",
            padding: "4px 8px",
          }}
        >{data.name}</span>
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            deleteLeague.mutate({ leagueId: leagueId });
          }}
        >
          Delete League
        </Button>
      </Stack>
    </Layout>
  );
};
