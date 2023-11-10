import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLeaguesQuery } from "./queries/useLeagues";
import { Layout } from "../../components/Layout";

export const Leagues = () => {
  const { isLoading, error, data } = useLeaguesQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Layout title="Your Leagues">
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
    </Layout>
  );
};
