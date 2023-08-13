const League = require('../models/league');
const { getUserFromFleaflicker, getLeagueFromFleaflicker } = require('../utils/fleaflicker');

exports.createLeague = async (leagueData) => {
  try {
    const league = new League(leagueData);
    const savedLeague = await league.save();
    return savedLeague;
  } catch (error) {
    throw error;
  }
};

exports.checkLeagueExists = async (externalLeagueId) => {
  try {
    const league = await League.findOne({ externalLeagueId });
    return league ? true : false;
  } catch (error) {
    throw error;
  }
};

exports.getAllLeagues = async () => {
  try {
    const leagues = await League.find({});
    return leagues;
  } catch (error) {
    throw error;
  }
};

exports.getExternalLeaguesForUser = async (externalUserData) => {
  try {
    const { externalSystem, credentials } = externalUserData;

    let externalUser;
    if (externalSystem === "fleaflicker") {
      externalUser = await getUserFromFleaflicker(credentials);
    }

    return externalUser;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
};

exports.getExternalRosters = async (externalLeagueData) => {
  try {
    const { externalSystem, id } = externalLeagueData;

    let externalLeague;
    if (externalSystem === "fleaflicker") {
      externalLeague = await getLeagueFromFleaflicker(id);
    }

    return externalLeague;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
}