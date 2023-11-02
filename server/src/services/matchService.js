const Match = require("../models/match");

exports.createMatch = async (matchData) => {
  try {
    const match = new Match({
      home_team_id: matchData.home_team_id,
      away_team_id: matchData.away_team_id,
      home_team_score: matchData.home_team_score,
      away_team_score: matchData.away_team_score,
      league_id: matchData.league_id,
      scoring_period: matchData.scoring_period,
      season: matchData.season,
    });
    const savedMatch = await match.save();
    return savedMatch;
  } catch (error) {
    throw new Error("Error creating league " + error.message);
  }
};

exports.getMatches = async ({ leagueId, teamId, season }) => {
  try {
    if (leagueId === null) {
      throw new Error(
        "Insufficient arguments provided. Please provide a leagueId"
      );
    }

    let queryParams = { league_id: leagueId };

    if (season != null) {
      queryParams.season = season;
    }

    const query = Match.where(queryParams);

    let matches;
    if (teamId != null) {
      matches = await query.or([
        { home_team_id: teamId },
        { away_team_id: teamId },
      ]);
    } else {
      matches = await query.find();
    }

    return matches;
  } catch (error) {
    throw new Error(`Error fetching matches: ${error.message}`);
  }
};
