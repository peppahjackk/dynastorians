// Import the required dependencies
const mongoose = require('mongoose');

// Define the user schema
const rosterSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: true
  },
  team_id: {
    type: String,
    required: true
  },
  team_name: {
    type: String, 
    required: true
  }
});

// Create the user model using the schema
const Roster = mongoose.model('Roster', rosterSchema);

// Export the User model
module.exports = Roster;