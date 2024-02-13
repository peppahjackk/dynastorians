const Manager = require("../models/manager"); // Import the Manager model
const teamService = require("./teamService"); // Import the team service

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

exports.getManager = async ({ user_id, league_id }) => {
  try {
    const filter = {};
    if (user_id) {
      filter.user_id = user_id;
    }
    const manager = await Manager.find(filter).exec();

    if (league_id) {
      const teamForManager = await teamService.getTeam({
        manager_id: manager._id,
        league_id: 12378,
      });

      if (teamForManager) {
        return manager;
      } else {
        return [];
      }
    }

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
