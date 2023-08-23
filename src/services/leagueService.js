const League = require("../models/league");
const { getUserFromFF } = require("../utils/fleaflicker");

exports.createLeague = async (leagueData) => {
  try {
    const league = new League(leagueData);
    const savedLeague = await league.save();
    return savedLeague;
  } catch (error) {
    throw new Error("Error creating league " + error.message);
  }
};

exports.getLeague = async (externalLeagueId) => {
  try {
    const league = await League.findOne({ externalLeagueId });
    return league;
  } catch (error) {
    throw new Error("Error getting league by external id " + error.message);
  }
};

exports.getLeagueById = async (id) => {
  try {
    const league = await League.findOne({ id });
    return league;
  } catch (error) {
    throw new Error("Error getting league " + error.message);
  }
};

exports.deleteLeague = async ({ id }) => {
  try {
    const league = await League.findOneAndDelete(id);
    return league;
  } catch (error) {
    throw new Error("Error deleting league" + error.message);
  }
};

exports.getAllLeagues = async () => {
  try {
    const leagues = await League.find({});
    return leagues;
  } catch (error) {
    throw new Error("Error getting all leagues " + error.message);
  }
};

exports.getExternalLeaguesForUser = async (externalUserData) => {
  try {
    const { externalSystem, credentials } = externalUserData;

    let externalUser;
    if (externalSystem === "fleaflicker") {
      externalUser = await getUserFromFF(credentials);
    }

    return externalUser;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
};
