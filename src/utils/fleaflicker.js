const axios = require("axios");

exports.getUserFromFF = async (credentials) => {
  try {
    const response = await axios.get(
      `https://www.fleaflicker.com/api/FetchUserLeagues?sport=NFL&email=${credentials.email}`
    );
    const user = response.data;
    return user;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
};

exports.getRostersFromFF = async (id) => {
  try {
    const response = await axios.get(
      `https://www.fleaflicker.com/api/FetchLeagueRosters?sport=NFL&league_id=${id}`
    );
    const league = response.data;
    return league;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
};

exports.formatFFLeagueData = (leagueData) => {
  const { id, name, sport } = leagueData;

  return {
    id,
    name,
    sport,
  };
};

exports.formatFFRosterData = (rosterData) => {
  const {
    id: externalPlayerId,
    nameFirst,
    nameLast,
    positionElibility,
    proTeamAbbreviation,
  } = rosterData;

  return {
    externalPlayerId,
    nameFirst,
    nameLast,
    positionElibility,
    proTeamAbbreviation,
  };
};
