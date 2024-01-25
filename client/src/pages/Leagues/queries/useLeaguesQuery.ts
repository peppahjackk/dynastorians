import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { League } from "../types/league";

function fetchLeagues({ userId }: { userId?: number }): Promise<League[]> {
  const url = userId ? `/api/users/leagues/${userId}` : `/api/leagues`;
  return axios.get(url).then((response) => response.data);
}

// ✅ data will be `League[] | undefined` here
export function useLeaguesQuery({ userId }: { userId?: number }) {
  return useQuery({
    queryKey: ["leagues", userId],
    queryFn: () => fetchLeagues({ userId }),
  });
}
