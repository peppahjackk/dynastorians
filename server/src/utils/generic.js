const { getRostersFromFF, getFirstSeason } = require("./fleaflicker");

const SEASON_END_MONTH = 2;
const SEASON_END_DAY = 11;

const getCurrentSeason = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const season =
    month > SEASON_END_MONTH ||
      (month === SEASON_END_MONTH && day > SEASON_END_DAY)
      ? year
      : year - 1;
  return season.toString();
};

const getExternalRosters = async ({ externalSystem, externalLeagueId, season }) => {
  try {
    let externalLeague;
    if (externalSystem === "fleaflicker") {
      externalLeague = await getRostersFromFF({ id: externalLeagueId, season });
    }

    return externalLeague;
  } catch (error) {
    throw new Error("Error getting user from external system: " + error.message);
  }
};

const determineFirstSeason = async ({ externalSystem, externalLeagueId }) => {
  try {
    console.log('Getting first season...')
    let externalLeague;
    if (externalSystem === "fleaflicker") {
      externalLeague = await getFirstSeason({ externalLeagueId, currentSeason: getCurrentSeason() });
    }

    return externalLeague;
  } catch (error) {
    throw new Error("Error calculating first season: " + error.message);
  }
};

module.exports = {
  getCurrentSeason,
  getExternalRosters,
  determineFirstSeason
}