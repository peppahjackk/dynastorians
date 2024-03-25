import React from "react";
import { useTeamsQuery } from "../../queries/useTeamsQuery";
import { Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { useAuth } from "../../../../features/auth/useAuth";
import { useManagersQuery } from "../../../../features/managers/useManagersQuery";

const columns: GridColDef[] = [
  {
    field: "num",
    headerName: "#",
    width: 35,
    valueGetter: (params) =>
      params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    cellClassName: (params: GridCellParams) =>
      params.row.userIsManager ? "my-team" : "not-me",
  },
  {
    field: "id",
    headerName: "Team",
    width: 200,
    valueGetter: ({ row }) => row.rosters[0].team_name,
    cellClassName: (params: GridCellParams) =>
      params.row.userIsManager ? "my-team" : "not-me",
  },
  {
    field: "averagePoints",
    headerName: "Average Points",
    width: 150,
    valueGetter: ({ row }) => row?.stats?.averagePoints?.toFixed(2),
    cellClassName: (params: GridCellParams) =>
      params.row.userIsManager ? "my-team" : "not-me",
  },
  {
    field: "bestRecord",
    headerName: "Best Record",
    width: 150,
    valueGetter: ({ row }) =>
      `${row.stats.bestRecord.wins}-${row.stats.bestRecord.losses}  (${row.stats.bestRecord.season})`,
    cellClassName: (params: GridCellParams) =>
      params.row.userIsManager ? "my-team" : "not-me",
  },
  {
    field: "winPct",
    headerName: "Win %",
    width: 100,
    valueGetter: ({ row }) => (row.stats.winPct * 100).toFixed(2) + "%",
    cellClassName: (params: GridCellParams) =>
      params.row.userIsManager ? "my-team" : "not-me",
  },
  {
    field: "record",
    headerName: "Record",
    width: 100,
    valueGetter: ({ row }) => `${row.stats.wins}-${row.stats.losses}`,
    cellClassName: (params: GridCellParams) =>
      params.row.userIsManager ? "my-team" : "not-me",
  },
];

export const Standings = ({
  league_id,
}: {
  league_id: string;
  season?: string;
}) => {
  const {
    data: teamsData,
    isLoading: teamsIsLoading,
    error: teamsError,
  } = useTeamsQuery({ league_id });
  const { user } = useAuth();
  const {
    data: manager,
    isLoading: managerIsLoading,
    error: managerError,
  } = useManagersQuery({
    userId: user?._id ?? null,
    leagueId: league_id,
  });

  let content;
  if (teamsIsLoading || managerIsLoading) {
    content = <div>loading teams...</div>;
  }

  if (teamsError) {
    content = <div>Teams error: {teamsError.message}</div>;
  }

  if (managerError) {
    content = <div>Manager error: {managerError.message}</div>;
  }

  if (teamsData == null || teamsData.length <= 0) {
    content = <div>No teams data found!</div>;
  }

  if (teamsData != null) {
    const rows = teamsData.map((team) => ({
      ...team,
      id: team._id,
      userIsManager:
        manager && manager[0] && team.manager_id === manager[0]._id,
    }));
    content = <DataGrid columns={columns} rows={rows} />;
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        "& .my-team": {
          backgroundColor: "rgb(0, 0, 0, 0.5)",
          fontWeight: "bold",
        },
      }}
    >
      <Typography variant="h4">League Stats - All Time</Typography>
      {content}
    </Stack>
  );
};
