import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Team } from "../teamTypes";

function fetchTeams({ league_id }: { league_id: string }): Promise<Team[]> {
  const params = new URLSearchParams();

  if (league_id != null) {
    params.append("league_id", league_id);
  }
  return axios
    .get(`/api/teams/?${params.toString()}`)
    .then((response) => response.data);
}

// ✅ data will be `Team[] | undefined` here
export function useTeamsQuery({ league_id }: { league_id: string }) {
  return useQuery({
    queryKey: ["teams", league_id],
    queryFn: () => fetchTeams({ league_id }),
  });
}
