import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LeagueFF } from "./fleaflickerTypes";

function fetchUserLeagues({ email }: { email?: string }): Promise<LeagueFF[]> {
  return axios
    .post(`/api/leagues/user/external`, {
      external_system: "fleaflicker",
      credentials: {email},
    })
    .then((response) => response.data);
}

export function useUserLeaguesFFQuery({ email }: { email?: string }) {
  return useQuery({
    queryKey: ["userLeagues/fleaflicker", email],
    enabled: email == null ? false : true,
    queryFn: () => fetchUserLeagues({ email }),
  });
}
