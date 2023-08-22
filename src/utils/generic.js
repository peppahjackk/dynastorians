const { getRostersFromFF } = require("./fleaflicker");

const SEASON_END_MONTH = 2;
const SEASON_END_DAY = 11;

exports.getCurrentSeason = () => {
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

exports.getExternalRosters = async ({ externalSystem, externalLeagueId }) => {
  try {
    let externalLeague;
    if (externalSystem === "fleaflicker") {
      externalLeague = await getRostersFromFF(externalLeagueId);
    }

    return externalLeague;
  } catch (error) {
    throw new Error("Error getting user from external system: " + error.message);
  }
};
