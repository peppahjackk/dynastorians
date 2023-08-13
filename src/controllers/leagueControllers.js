const leagueService = require("../services/leagueService");

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
      error:
        "An error occurred while connecting the user to the external system" +
        error.message,
    });
  }
};

exports.connectLeague = async (req, res) => {
  const { externalSystem, id, sport, name } = req.body;
  try {
    const rosterData = await leagueService.getExternalRosters({
      externalSystem,
      id,
    });
    const newLeague = await leagueService.createLeague({
      externalLeagueId: id,
      externalSystem,
      sport,
      name,
    });
    res.status(201).json(newLeague);
  } catch (error) {
    res.status(500).send({
      error:
        "An error occurred while connecting the user to the external system" +
        error.message,
    });
  }
};
