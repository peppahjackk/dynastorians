import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Manager } from "./managerTypes";

function fetchUserManagers({
  userId,
  leagueId = null,
}: {
  userId: string;
  leagueId: string | null;
}): Promise<Manager[]> {
  return axios
    .get(`/api/manager?user_id=${userId}&league_id=${leagueId}`)
    .then((response) => response.data);
}

function addManager({
  userId,
  externalSystem,
  email,
  username,
}: {
  userId: string;
  externalSystem: string;
  email?: string;
  username?: string;
}): Promise<Manager> {
  return axios
    .post(`/api/manager`, {
      user_id: userId,
      external_system: externalSystem,
      email,
      username,
    })
    .then((response) => response.data);
}

export function useManagersQuery({ userId, leagueId }: { userId: string | null, leagueId: string | null }) {
  return useQuery({
    queryKey: ["manager", userId, leagueId],
    enabled: userId == null ? false : true,
    queryFn: () => fetchUserManagers({ userId, leagueId}),
  });
}

export function useAddManagerMutation() {
  return useMutation({
    mutationFn: ({
      userId,
      externalSystem,
      email,
      username,
    }: {
      userId: string;
      externalSystem: string;
      email?: string;
      username?: string;
    }) => addManager({ userId, externalSystem, email, username }),
  });
}
