const express = require("express");
const matchService = require("../services/matchService");

exports.createMatch = async (req, res) => {
  const {
    home_team_id,
    away_team_id,
    home_team_score,
    away_team_score,
    league_id,
    scoring_period,
    season,
  } = req.body;
  try {
    if (
      home_team_id == null ||
      away_team_id == null ||
      home_team_score == null ||
      away_team_score == null ||
      league_id == null ||
      scoring_period == null ||
      season == null
    ) {
      throw new Error("Insufficient arguments provided");
    } else {
      const match = await matchService.createMatch({
        home_team_id,
        away_team_id,
        home_team_score,
        away_team_score,
        league_id,
        scoring_period,
        season,
      });
      res.status(200).send(match);
    }
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while creating match" + error.message,
    });
  }
};

exports.getMatches = async (req, res) => {
  const { leagueId, teamId, season } = req.body;
  try {
    let matches;
    if (leagueId != null) {
      matches = await matchService.getMatches({ leagueId, season, teamId });
    } else {
      throw new Error("Insufficient arguments provided. Please provide a leagueId");
    }

    res.status(200).send(matches);
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while getting matches" + error.message,
    });
  }
};
