import { Button, Card, CardActions, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLeaguesQuery } from "./queries/useLeaguesQuery";
import { Layout } from "../../components/Layout";
import { League } from "./types/league";

export const Leagues = () => {
  const { isLoading, error, data } = useLeaguesQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Layout title="Leagues">
      {data == null || data.length === 0 ? (
        <Typography variant="h4">No leagues found</Typography>
      ) : (
        data.map((league: League) => (
          <Link to={`/leagues/${league._id}`} key={league._id}>
            <Card sx={{ minWidth: 275, padding: "16px" }} variant="outlined">
              <Typography variant="h5">{league.name}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Est. {league.first_season}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Platform: {league.external_system.charAt(0).toUpperCase() + league.external_system.slice(1)}
              </Typography>
              <CardActions>
                <Button size="small" variant="contained">View</Button>
              </CardActions>
            </Card>
          </Link>
        ))
      )}
      <Button variant="outlined" onClick={() => navigate("league/sync")}>
        + Sync New League
      </Button>
    </Layout>
  );
};
