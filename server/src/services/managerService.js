const Manager = require("../models/manager"); // Import the Manager model

// Function to create a new manager
exports.createManager = async (managerData) => {
  try {
    const newManager = new Manager(managerData);
    const savedManager = await newManager.save();
    return savedManager;
  } catch (error) {
    throw new Error("Error creating manager" + error.message);
  }
};

exports.getManagerByUserId = async (user_id) => {
  try {
    const manager = await Manager.find().where("user_id").equals(user_id);
    return manager;
  } catch (error) {
    throw new Error("Error retrieving manager with leagues" + error.message);
  }
};

// Function to fetch all managers
exports.getAllManagers = async () => {
  try {
    const managers = await Manager.find();
    return managers;
  } catch (error) {
    throw new Error("Error retrieving managers" + error.message);
  }
};

// Function to delete a manager
exports.deleteManager = async ({ id }) => {
  try {
    const manager = await Manager.findByIdAndDelete(id);
    return manager;
  } catch (error) {
    throw new Error("Error deleting manager" + error.message);
  }
};
