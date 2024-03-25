import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { League } from "../types/league";

function deleteLeague({ leagueId }: { leagueId: string }): Promise<League> {
  return axios
    .delete(`/api/leagues/${leagueId}`)
    .then((response) => response.data);
}

export function useDeleteLeagueMutation() {
  return useMutation({
    mutationFn: ({ leagueId }: { leagueId: string }) =>
      deleteLeague({ leagueId }),
  });
}
