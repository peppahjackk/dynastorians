const express = require("express");
const managerService = require("../services/managerService");

exports.createManager = async (req, res) => {
  try {
    const { user_id, external_system, email, username } = req.body;
    if (!user_id || !external_system || (!email && !username)) {
      throw new Error(
        `Insufficient manager parameters provided: user_id missing ${
          user_id == null
        }, external_system missing ${
          external_system == null
        }, email or username missing ${email == null && username == null}`,
      );
    }

    const manager = await managerService.createManager({
      user_id,
      external_system,
      email,
      username,
    });

    res.status(201).send(manager);
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while creating the manager" + error.message,
    });
  }
};

exports.getManagers = async (req, res) => {
  try {
    const { user_id, league_id } = req.query;

    if (!user_id || !league_id) {
      throw new Error("User id or League id is required");
    }

    const managers = await managerService.getManager({user_id, league_id});
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving manager with leagues",
    });
  }
};
