import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLeagues } from "../queries/useLeagues";

export const Home = () => {
  const { isLoading, error, data } = useLeagues();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
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
