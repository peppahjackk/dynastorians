const axios = require('axios');

exports.getUserFromFleaflicker = async (credentials) => {
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

exports.getLeagueFromFleaflicker = async (id) => {
  try {
    const response = await axios.get(
      `https://www.fleaflicker.com/api/FetchLeagueRosters?sport=NFL&league_id=${id}`
    );
    const league = response.data;
    return league;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
}