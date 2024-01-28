import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Manager } from "./managerTypes";

function fetchUserManagers({ userId }: { userId: string }): Promise<Manager[]> {
  return axios
    .get(`/api/manager?user_id=${userId}`)
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

export function useManagersQuery({ userId }: { userId?: string }) {
  return useQuery({
    queryKey: ["manager", userId],
    enabled: userId == null ? false : true,
    queryFn: () => fetchUserManagers({ userId }),
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
