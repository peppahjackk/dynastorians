const { getRostersFromFF, getfirst_season } = require("./fleaflicker");

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

const getExternalRosters = async ({ external_system, external_league_id, season }) => {
  try {
    let externalLeague;
    if (external_system === "fleaflicker") {
      externalLeague = await getRostersFromFF({ id: external_league_id, season });
    }

    return externalLeague;
  } catch (error) {
    throw new Error("Error getting user from external system: " + error.message);
  }
};

const determinefirst_season = async ({ external_system, external_league_id }) => {
  try {
    console.log('Getting first season...')
    let externalLeague;
    if (external_system === "fleaflicker") {
      externalLeague = await getfirst_season({ external_league_id, currentSeason: getCurrentSeason() });
    }

    return externalLeague;
  } catch (error) {
    throw new Error("Error calculating first season: " + error.message);
  }
};

module.exports = {
  getCurrentSeason,
  getExternalRosters,
  determinefirst_season
}