import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <Typography variant="h2">Your Leagues</Typography>
      {data == null || data.length === 0 ? (
        <Typography variant="h3">No leagues found</Typography>
      ) : (
        data.map((league: any) => (
          <Link to={`league/${league._id}`} key={league._id}>
            <Typography variant="h5">
              {league.name}
            </Typography>
          </Link>
        ))
      )}
    </div>
  );
};
