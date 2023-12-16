export interface RosterFF {
    id: number;
    name: string;
    logoUrl: string;
    recordOverall: {
        wins: number;
        losses: number;
        ties?: number;
        winPercentage: {
            value: number;
            formatted: string
        }
        rank: number;
        formatted: string
    }
    pointsFor: {
        value: number;
        formatted: string;
    },
    pointsAgainst: {
        value: number;
        formatted: string;
    },
    draftStatus: string;
}

export interface LeagueFF {
    name: string;
    id: number;
    logoUrl: string;
    ownedTeam: RosterFF;
    external_league_id: string;
    first_season: string;
    status: "Idle" | "Syncing" | "Error";
  }
  