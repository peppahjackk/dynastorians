import { useParams } from "react-router";
import { Layout } from "../../components/Layout";
import { useLeagueQuery } from "./queries/useLeagueQuery";

export const League = () => {
  const { leagueId } = useParams();

  const { data, loading, error } = useLeagueQuery({ id: leagueId });

  if (loading) {
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
      
    </Layout>
  );
};
