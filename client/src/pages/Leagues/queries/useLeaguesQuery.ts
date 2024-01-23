import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { League } from "../types/league";

function fetchLeagues({ userId }: { userId?: string }): Promise<League[]> {
  return axios
    .get(`/api/users/leagues/${userId}`)
    .then((response) => response.data);
}

// ✅ data will be `League[] | undefined` here
export function useLeaguesQuery({ userId }: { userId?: string }) {
  return useQuery({
    queryKey: ["leagues", userId],
    queryFn: () => fetchLeagues({ userId }),
  });
}
