import { useParams } from "react-router";
import { Layout } from "../../components/Layout";
import { useLeagueQuery } from "./queries/useLeagueQuery";
import { Standings } from "../Team/components/Standings/Standings";
import { Stack } from "@mui/material";

export const League = () => {
  const { leagueId } = useParams();

  const { data, isLoading, error } = useLeagueQuery({ id: leagueId });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error || !leagueId) {
    return (
      <div>
        {error
          ? error.message
          : !leagueId
          ? "No league id"
          : "Something went wrong"}
      </div>
    );
  }

  if (data == null) {
    return <div>no data</div>;
  }

  return (
    <Layout title={data.name}>
      <Stack direction="column" spacing={2}>
        <Standings league_id={leagueId} />
      </Stack>
    </Layout>
  );
};
