const express = require("express");
const rosterService = require("../services/rosterService");

exports.getRosters = async (req, res) => {
  const { leagueId } = req.body;
  try {

    let rosters;
    if (leagueId != null) {
        rosters = await rosterService.getRosterByLeagueId({ id: leagueId});
    } else {
        throw new Error('Insufficient arguments provided')
    }

    res.status(200).send(rosters);
  } catch (error) {
    res
      .status(500)
      .send({
        error: "An error occurred while creating the user" + error.message,
      });
  }
};
