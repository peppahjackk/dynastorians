import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { League } from "../types/league";

function fetchLeagues(): Promise<League[]> {
  return axios.get("/api/leagues").then((response) => response.data);
}

// ✅ data will be `League[] | undefined` here
export function useLeaguesQuery() {
  return useQuery({ queryKey: ["leagues"], queryFn: fetchLeagues });
}
