const User = require("../models/user"); // Import the User model

// Function to create a new user
exports.createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error creating user" + error.message);
  }
};

// Function to fetch user by ID
exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Error retrieving user with leagues" + error.message);
  }
};

// Function to fetch all users
exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error retrieving users" + error.message);
  }
};

// Function to delete a user
exports.deleteUser = async ({ id }) => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new Error("Error deleting user" + error.message);
  }
};
