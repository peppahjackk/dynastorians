const express = require("express");
const teamService = require("../services/teamService");

exports.getTeams = async (req, res) => {
  const { leagueId } = req.body;
  try {

    let teams;
    if (leagueId != null) {
        teams = await teamService.getTeamByLeagueId({ id: leagueId});
    } else {
        throw new Error('Insufficient arguments provided')
    }

    res.status(200).send(teams);
  } catch (error) {
    res
      .status(500)
      .send({
        error: "An error occurred while creating the user" + error.message,
      });
  }
};
