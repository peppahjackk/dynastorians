import React from 'react'
import { useTeamsQuery } from '../../queries/useTeamsQuery'
import { Box, Typography } from '@mui/material';

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
        return <div>
          <Typography variant="body1" key={team.id}>{team.id}</Typography>
        </div>
      })}
    </Box>

  )
}