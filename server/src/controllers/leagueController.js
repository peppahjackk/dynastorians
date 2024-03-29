const leagueService = require("../services/leagueService");
const teamService = require("../services/teamService");
const rosterService = require("../services/rosterService");

exports.getAllLeagues = async (req, res) => {
  try {
    const allLeagues = await leagueService.getAllLeagues();
    res.status(200).json(allLeagues);
  } catch (error) {
    res.status(500).send({ message: `Bummer, Error: ${error.message}` });
  }
};

exports.getLeagueById = async (req, res) => {
  const id = req.params.id;
  try {
    const league = await leagueService.getLeagueById(id);
    if (league) {
      res.status(200).json(league);
    } else {
      res.status(404).send({ message: "League not found" });
    }
  } catch (error) {
    res.status(500).send({ message: `Error: ${error.message}` });
  }
};

exports.deleteLeague = async (req, res) => {
  const { id } = req.params;
  try {
    const league = await leagueService.deleteLeague({ id });
    if (!league) {
      res.status(404).send({ message: "League not found" });
    }

    await teamService.delete({ league_id: id });
    await rosterService.delete({ league_id: id });
    res.status(200).send({ message: "League deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error deleting league: ${error.message}` });
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
      externalUserData,
    );
    res.status(200).send(leagues);
  } catch (error) {
    res.status(500).send({
      error: `An error occurred while connecting the getting the external League: ${error.message}`,
    });
  }
};

exports.syncLeague = async (req, res) => {
  const {
    id: external_league_id,
    external_system,
    sport,
    name,
    external_owned_team_id,
    manager_id,
  } = req.body;
  try {
    if (!external_league_id) {
      throw new Error("External league id is required");
    }
    if (!external_system) {
      throw new Error("External system is required");
    }
    if (!sport) {
      throw new Error("Sport is required");
    }
    if (!name) {
      throw new Error("Name is required");
    }
    if (!external_owned_team_id) {
      throw new Error("External owned team id is required");
    }
    if (!manager_id) {
      throw new Error("Manager id is required");
    }

    let league = await leagueService.getLeagueByExternalId(external_league_id);
    let statusCode = 200;
    if (!league) {
      // If the league does not exist in our database, we need to connect it
      league = await leagueService.createLeague({
        external_league_id,
        external_system,
        sport,
        name,
      });
      statusCode = 201;
      console.log("League created! Id: ", league._id);
    }
    // TODO validate league is up to date if it already exists

    await teamService.syncTeams({
      league: league,
      manager: { id: manager_id, external_owned_team_id },
    });
    await rosterService.syncRosters(league);
    await teamService.updateTeam({
      external_team_id: external_owned_team_id,
      data: { manager_id },
    });

    res.status(statusCode).json(league);
  } catch (error) {
    const errorMessage = `An error occurred while connecting the user to the external system: ${error.message}`;
    console.log(errorMessage);
    res.status(500).send({
      error: errorMessage,
    });
  }
};
