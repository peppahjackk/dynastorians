const League = require('../models/league');

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