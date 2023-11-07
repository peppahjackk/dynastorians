// Import the required dependencies
const mongoose = require('mongoose');

// Define the league schema
const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  externalLeagueId: {
    type: String,
    required: true,
  },
  dateUpdated: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Idle', 'Syncing', 'Error'],
    default: "Idle"
  },
  externalSystem: {
    type: String,
    required: true,
    enum: ['sleeper', 'fleaflicker'],
  },
  firstSeason: {
    type: String,
    required: true,
  }
});

// Create the league model using the schema
const League = mongoose.model('League', leagueSchema);

// Export the League model
module.exports = League;