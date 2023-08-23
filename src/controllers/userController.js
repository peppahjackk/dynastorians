const express = require("express");
const userService = require("../services/userService");

// Create a new user
exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await userService.createUser(userData);
    res.status(201).send(user);
  } catch (error) {
    res
      .status(500)
      .send({
        error: "An error occurred while creating the user" + error.message,
      });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving users" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user with leagues" });
  }
};
