const axios = require('axios');
const League = require('../models/league');

const getUserFromFleaflicker = async (credentials) => {
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