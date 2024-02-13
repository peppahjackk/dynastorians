const League = require("../models/league");
const { getUserFromFF } = require("../utils/fleaflicker");
const { determinefirst_season } = require("../utils/generic");

exports.createLeague = async (leagueData) => {
  try {
    const first_season = await determinefirst_season({
      external_system: leagueData.external_system,
      external_league_id: leagueData.external_league_id,
    });
    const league = new League({ ...leagueData, first_season });
    const savedLeague = await league.save();
    return savedLeague;
  } catch (error) {
    throw new Error("Error creating league " + error.message);
  }
};

exports.getLeagueByExternalId = async (external_league_id) => {
  try {
    const league = await League.findOne({ external_league_id });
    return league;
  } catch (error) {
    throw new Error("Error getting league by external id " + error.message);
  }
};

exports.getLeagueById = async (id) => {
  try {
    const league = await League.findById(id);
    return league;
  } catch (error) {
    throw new Error("Error getting league " + error.message);
  }
};

exports.getLeagueByUserId = async (user_id) => {
  try {
    const leagues = await League.find({ user_id });
    return leagues;
  } catch (error) {
    throw new Error("Error getting league " + error.message);
  }
};

exports.deleteLeague = async ({ id }) => {
  try {
    const league = await League.findOneAndDelete(id);
    return league;
  } catch (error) {
    throw new Error("Error deleting league: " + error.message);
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
    const { external_system, credentials } = externalUserData;

    console.log("trying to get externalUserData", externalUserData);

    let externalUser;
    if (external_system === "fleaflicker") {
      externalUser = await getUserFromFF(credentials);
    } else {
      throw new Error("External system not supported");
    }

    console.log("externalUser", externalUser);

    return externalUser;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
};
