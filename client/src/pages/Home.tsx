import React from "react";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Home = () => {
  // call my api from a useQuery
  const { isLoading, error, data } = useQuery({
    queryKey: ["leagues"],
    queryFn: () => axios.get("/api/leagues").then((res) => res.data),
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  return (
    <div>
      <Typography variant="h2">Home</Typography>
      {data == null || data.length === 0 ? (
        <Typography variant="h3">No leagues found</Typography>
      ) : (
        data.map((league: any) => (
          <Typography key={league.id} variant="body1">
            {league.name}
          </Typography>
        ))
      )}
    </div>
  );
};
