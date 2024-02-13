export interface Team {
  _id: string;
  league_id: string;
  external_team_id: string;
  rosters: Roster[];
  stats: Stats;
  manager_id: string;
}

export interface Roster {
  _id: string;
  team_id: string;
  league_id: string;
  team_name: string;
  external_roster_id: string;
  season: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  placement?: number;
}

export interface Stats {
  wins: number;
  losses: number;
  winPct: number;
}
