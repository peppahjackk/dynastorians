// Import the required dependencies
const mongoose = require("mongoose");

// Define the manager schema
const managerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  externalSystem: {
    type: String,
    required: true,
  },
});

// Create the manager model using the schema
const Manager = mongoose.model("Manager", managerSchema);

// Export the Manager model
module.exports = Manager;
