// Import the required dependencies
const mongoose = require("mongoose");

// Define the user schema
const matchSchema = new mongoose.Schema({
  away_team_id: {
    type: String,
    required: true,
  },
  home_team_id: {
    type: String,
    required: true,
  },
  away_team_score: {
    type: Number,
    required: true,
  },
  home_team_score: {
    type: Number,
    required: true,
  },
  league_id: {
    type: String,
    required: true,
  },
  scoring_period: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  }
});

// Create the user model using the schema
const Match = mongoose.model("Match", matchSchema);

// Export the User model
module.exports = Match;