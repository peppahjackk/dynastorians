const axios = require("axios");

exports.getUserFromFF = async (credentials) => {
  try {
    const response = await axios.get(
      `https://www.fleaflicker.com/api/FetchUserLeagues?sport=NFL&email=${credentials.email}`
    );
    const user = response.data;
    return user;
  } catch (error) {
    throw new Error("Error getting user from FleaFlicker" + error.message);
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
    throw new Error("Error getting Rosters from FleaFlicker" + error.message);
  }
};

exports.getFirstSeason = async ({ externalLeagueId: id, currentSeason}) => {
  try {
    let oldestDraft = Number(currentSeason);
    let moreDraftsToGo = true;
    while(moreDraftsToGo) {
      const seasonToTry = oldestDraft - 1;
      const response = await axios.get('https://www.fleaflicker.com/api/FetchLeagueDraftBoard?sport=NFL&league_id=' + id + '&season=' + seasonToTry);
      if (response?.data?.rows == null && response?.data?.orderedSelections == null) {
        moreDraftsToGo = false;
      }
      oldestDraft = seasonToTry;
    }

    return oldestDraft.toString();
  } catch (error) {
    throw new Error("Error getting first season from FleaFlicker" + error.message);
  }
}