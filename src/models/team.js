// Import the required dependencies
const mongoose = require('mongoose');

// Define the user schema
const teamSchema = new mongoose.Schema({
  league_id: {
    type: String,
    required: true
  },
  roster_ids: {
    type: [String],
    required: true
  },
});

// Create the user model using the schema
const Team = mongoose.model('Team', teamSchema);

// Export the User model
module.exports = Team;