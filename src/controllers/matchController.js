const express = require("express");
const matchService = require("../services/matchService");

exports.getMatches = async (req, res) => {
  const { leagueId, id, teamId } = req.body;
  try {

    let matches;
    if (id != null) {
        matches = await matchService.getMatchById({ id });
    } else {
        throw new Error('Insufficient arguments provided')
    }

    res.status(200).send(matches);
  } catch (error) {
    res
      .status(500)
      .send({
        error: "An error occurred while getting matches" + error.message,
      });
  }
};
