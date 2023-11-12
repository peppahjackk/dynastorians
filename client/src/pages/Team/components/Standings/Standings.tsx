import React from 'react'
import { useTeamsQuery } from '../../queries/useTeamsQuery'
import { Box, Stack, Typography } from '@mui/material';

export const Standings = ({ league_id }: { league_id: string, season?: string }) => {
  const { data: teamsData, isLoading: teamsIsLoading, error: teamsError } = useTeamsQuery({ league_id });

  if (teamsIsLoading) {
    return <div>loading teams...</div>
  }

  if (teamsError) {
    return <div>Teams error: {teamsError.message}</div>
  }

  if (teamsData == null || teamsData.length <= 0) {
    return <div>No teams data found!</div>
  }

  return (
    <Box>
      <div>Standings</div>
      {teamsData.map(team => {
        const mostRecentRoser = team.rosters[team.rosters.length - 1];
        return <div key={team._id}>
          <Stack direction="row" spacing={2}>
            <Typography variant="body1">{mostRecentRoser.team_name}</Typography>
            <Typography variant="body1">{team.stats.winPct.toFixed(3)}</Typography>
            <Typography variant="body1">{team.stats.wins}-{team.stats.losses}</Typography>
          </Stack>
        </div>
      })}
    </Box>

  )
}