import { useParams } from 'react-router'

export const League = () => {
    const { leagueId } = useParams();

    return (
        <div>League - {leagueId} </div>
    )
}