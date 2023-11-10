export interface League {
  name: string;
  id: string;
  externalSystem: "sleeper" | "fleaflicker";
  externalLeagueId: string;
  firstSeason: string;
  status: "Idle" | "Syncing" | "Error";
}
