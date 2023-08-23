// Import the required dependencies
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

// Create the user model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;