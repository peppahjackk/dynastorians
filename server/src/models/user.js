// Import the required dependencies
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  external_user_id: {
    type: String,
    required: true,
  },
  external_system: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

// Create the user model using the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
