const leagueService = require("../services/leagueService");
const teamService = require("../services/teamService");

// get all leagues
exports.getAllLeagues = async (req, res) => {
  try {
    const allLeagues = await leagueService.getAllLeagues();
    res.json(allLeagues);
  } catch (error) {
    res.status(500).send({ message: `Bummer, Error: ${error.message}` });
  }
};

exports.getLeagueById = async (req, res) => {
  const id = req.params.id;
  try {
    const league = await leagueService.getLeagueById(id);
    if (league) {
      res.json(league);
    } else {
      res.status(404).send({ message: "League not found" });
    }
  } catch (error) {
    res.status(500).send({ message: `Error: ${error.message}` });
  }
};

exports.createLeague = async (req, res) => {
  try {
    const leagueData = req.body;
    const newLeague = await leagueService.createLeague(leagueData);
    res.status(201).json(newLeague);
  } catch (error) {
    res.status(500).send({ message: `Error: ${error.message}` });
  }
};

exports.getExternalLeagues = async (req, res) => {
  const externalUserData = req.body;
  try {
    const { leagues } = await leagueService.getExternalLeaguesForUser(
      externalUserData
    );
    res.send(leagues);
  } catch (error) {
    res.status(500).send({
      error: `An error occurred while connecting the getting the external League: ${error.message}`,
    });
  }
};

exports.syncLeague = async (req, res) => {
  const { id: externalLeagueId, externalSystem, sport, name } = req.body;
  try {
    let league = await leagueService.getLeague(externalLeagueId);
    if (!league) {
      // If the league does not exist in our database, we need to connect it
      league = await leagueService.createLeague({
        externalLeagueId,
        externalSystem,
        sport,
        name
      });
    }

    // TODO validate league is up to date if it already exists

    const updatedLeagueData = await teamService.syncTeams(league);
    
    res.status(201).json(updatedLeagueData);
  } catch (error) {
    res.status(500).send({
      error: `An error occurred while connecting the user to the external system: ${error.message}`,
    });
  }
};
