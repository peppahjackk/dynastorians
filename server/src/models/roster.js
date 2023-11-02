// Import the required dependencies
const mongoose = require("mongoose");

// Define the user schema
const rosterSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
  },
  league_id: {
    type: String,
    required: true,
  },
  team_name: {
    type: String,
    required: true,
  },
  external_roster_id: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  losses: {
    type: Number,
    required: true,
  },
  pointsFor: {
    type: Number,
    required: true,
  },
  pointsAgainst: {
    type: Number,
    required: true,
  },
  placement: {
    type: Number
  }
});

// Create the user model using the schema
const Roster = mongoose.model("Roster", rosterSchema);

// Export the User model
module.exports = Roster;