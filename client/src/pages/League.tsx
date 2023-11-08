import { useParams } from 'react-router'
import { Layout } from '../components/Layout';

export const League = () => {
  const { leagueId } = useParams();

  return (
    <Layout title={`League Name`}>
      Let's have some fun, {leagueId}
    </Layout>
  )
}