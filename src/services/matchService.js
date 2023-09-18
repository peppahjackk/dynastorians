const Match = require("../models/match");

exports.getMatchById = async ({ id }) => {
  try {
    let matches = await Match.findById(id)

    return matches;

  } catch (error) {
    throw new Error(`Error fetching matches: ${error.message}`)
  }
}
