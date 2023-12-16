export interface League {
  name: string;
  _id: string;
  external_system: "sleeper" | "fleaflicker";
  external_league_id: string;
  first_season: string;
  status: "Idle" | "Syncing" | "Error";
}
