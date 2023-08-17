const { getRostersFromFF } = require('../utils/fleaflicker');

exports.getExternalRosters = async (externalLeagueData) => {
  try {
    const { externalSystem, id } = externalLeagueData;

    let externalLeague;
    if (externalSystem === "fleaflicker") {
      externalLeague = await getRostersFromFF(id);
    }

    return externalLeague;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
}