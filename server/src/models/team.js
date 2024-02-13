// Import the required dependencies
const mongoose = require("mongoose");

// Define the user schema
const teamSchema = new mongoose.Schema({
  league_id: {
    type: String,
    required: true,
  },
  external_team_id: {
    type: String,
    required: true,
  },
  manager_id: {
    type: String,
  },
});

// Create the user model using the schema
const Team = mongoose.model("Team", teamSchema);

// Export the User model
module.exports = Team;
