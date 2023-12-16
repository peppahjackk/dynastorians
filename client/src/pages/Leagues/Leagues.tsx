import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLeaguesQuery } from "./queries/useLeaguesQuery";
import { Layout } from "../../components/Layout";
import { League } from "./types/league";

export const Leagues = () => {
  const { isLoading, error, data } = useLeaguesQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Layout title="Your Leagues">
      {data == null || data.length === 0 ? (
        <Typography variant="h4">No leagues found</Typography>
      ) : (
        data.map((league: League) => (
          <Link to={`/leagues/${league._id}`} key={league._id}>
            <Typography variant="h5">{league.name}</Typography>
          </Link>
        ))
      )}
      <Button variant="contained" onClick={() => navigate("league/sync")}>
        + Connect League
      </Button>
    </Layout>
  );
};
