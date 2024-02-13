const express = require("express");
const teamService = require("../services/teamService");
const rosterService = require("../services/rosterService");

exports.getTeams = async (req, res) => {
  try {
    const { league_id, season } = req.query;

    const teamQueryParams = {};
    if (league_id != null) {
      teamQueryParams.league_id = league_id;
    }
    if (season != null) {
      teamQueryParams.season = season;
    }

    if (teamQueryParams.league_id == null) {
      throw new Error("Insufficient arguments provided");
    }

    const teams = await teamService.getTeams(teamQueryParams);

    const fullTeamsResponse = await Promise.all(
      teams.map(async (team) => {
        const rosterQueryParams = { team_id: team._id };
        if (season != null) {
          rosterQueryParams.season = season;
        }
        const rosters = await rosterService.getRosters(rosterQueryParams);

        const stats = await rosterService.generateStats(rosters);

        return {
          _id: team._id,
          league_id: team.league_id,
          external_team_id: team.external_league_id,
          manager_id: team.manager_id,
          rosters,
          stats,
        };
      }),
    );

    const sortedTeams = fullTeamsResponse.sort(
      (a, b) => b.stats.averagePoints - a.stats.averagePoints,
    );

    res.status(200).send(sortedTeams);
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while getting teams" + error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { league_id, id } = req.params;
  try {
    const team = await teamService.delete({ league_id, id });
    if (!team) {
      res.status(404).send({ message: "Team not found" });
    }

    await rosterService.delete({ team_id: id, league_id });
    res.status(200).send({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: `Error deleting team: ${error.message}` });
  }
};
