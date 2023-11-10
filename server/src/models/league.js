// Import the required dependencies
const mongoose = require('mongoose');

// Define the league schema
const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  external_league_id: {
    type: String,
    required: true,
  },
  date_updated: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['idle', 'syncing', 'error'],
    default: "idle"
  },
  external_system: {
    type: String,
    required: true,
    enum: ['sleeper', 'fleaflicker'],
  },
  first_season: {
    type: String,
    required: true,
  }
});

// Create the league model using the schema
const League = mongoose.model('League', leagueSchema);

// Export the League model
module.exports = League;