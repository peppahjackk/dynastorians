import React from 'react'
import { useTeamsQuery } from '../../queries/useTeamsQuery'
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'num', headerName: "#", width: 200, valueGetter: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
  },
  { field: 'id', headerName: "Team", width: 200, valueGetter: ({ row }) => (row.rosters[row.rosters.length - 1].team_name) },
  {
    field: 'winPct', headerName: "Win %", width: 150, valueGetter: ({ row }) =>
      (row.stats.winPct * 100).toFixed(2) + '%'
  },
  { field: 'record', headerName: 'Record', width: 150, valueGetter: ({ row }) => `${row.stats.wins}-${row.stats.losses}` },
  { field: 'averagePoints', headerName: 'Average Points', width: 150, valueGetter: ({ row }) => row.stats.averagePoints.toFixed(2) }
]

export const Standings = ({ league_id }: { league_id: string, season?: string }) => {
  const { data: teamsData, isLoading: teamsIsLoading, error: teamsError } = useTeamsQuery({ league_id });

  let content;
  if (teamsIsLoading) {
    content = <div>loading teams...</div>
  }

  if (teamsError) {
    content = <div>Teams error: {teamsError.message}</div>
  }

  if (teamsData == null || teamsData.length <= 0) {
    content = <div>No teams data found!</div>
  }

  if (teamsData != null) {
    const rows = teamsData.map(team => ({ ...team, id: team._id }))
    content = <DataGrid columns={columns} rows={rows} />
  }

  return (
    <Box>
      <Typography variant="h3">Standings</Typography>
      {content}
    </Box>
  )
}