const express = require("express");
const rosterService = require("../services/rosterService");

exports.getRosters = async (req, res) => {
  const { league_id, team_id, season } = req.body;
  try {
    if (league_id == null && team_id == null && season == null) {
      throw new Error('Insufficient arguments provided')
    }
    const rosters = await rosterService.getRosters({ league_id, team_id, season });

    res.status(200).send(rosters);
  } catch (error) {
    res
      .status(500)
      .send({
        error: "An error occurred while creating the user" + error.message,
      });
  }
};
