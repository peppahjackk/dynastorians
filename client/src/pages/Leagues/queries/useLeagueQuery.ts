import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { League } from "../types/league";

function fetchLeague({ id }: { id: string }): Promise<League> {
  return axios.get(`/api/leagues/${id}`).then((response) => response.data);
}

// ✅ data will be `League | undefined` here
export function useLeagueQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: ["leagues", id],
    queryFn: () => fetchLeague({ id }),
  });
}
