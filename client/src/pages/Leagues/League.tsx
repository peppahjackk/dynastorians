import { useParams } from "react-router";
import { Layout } from "../../components/Layout";
import { useLeagueQuery } from "./queries/useLeagueQuery";
import { Standings } from "../Team/components/Standings/Standings";

export const League = () => {
  const { leagueId } = useParams();

  const { data, isLoading, error } = useLeagueQuery({ id: leagueId });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (data == null) {
    return <div>no data</div>;
  }

  return (
    <Layout title={data.name}>
      <Standings league_id={leagueId} />
    </Layout>
  );
};
