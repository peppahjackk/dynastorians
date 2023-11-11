const express = require("express");
const teamService = require("../services/teamService");
const rosterService = require("../services/rosterService")

exports.getTeams = async (req, res) => {
  try {
    const { league_id, season } = req.query;

    const teamQueryParams = {};
    if (league_id != null) {
      teamQueryParams.league_id = league_id
    }
    if (season != null) {
      teamQueryParams.season = season;
    }

    if (teamQueryParams.league_id == null) {
      throw new Error('Insufficient arguments provided')
    }

    const teams = await teamService.getTeams(teamQueryParams);

    console.log('teams', teams)

    const fullTeamsResponse = await Promise.all(teams.map(async (team) => {
      const rosterQueryParams = { team_id: team._id };
      if (season != null) {
        rosterQueryParams.season = season
      }
      const rosters = await rosterService.getRosters(rosterQueryParams)

      return { _id: team._id, league_id: team.league_id, external_team_id: team.external_league_id, rosters }
    }))

    console.log('fullTeamsResponse', fullTeamsResponse)

    res.status(200).send(fullTeamsResponse);
  } catch (error) {
    res
      .status(500)
      .send({
        error: "An error occurred while getting teams" + error.message,
      });
  }
};
