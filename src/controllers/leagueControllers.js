const leagueService = require('../services/leagueService');

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
      res.status(404).send({ message: 'League not found' });
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

exports.connectLeague = async (req, res) => {
  const { externalLeagueId, externalSystem = 'fleaflicker' } = req.body;
  try {
    const exists = await leagueService.checkLeagueExists(externalLeagueId);
    if (exists) {
      res.json({ message: `League with external ID ${externalLeagueId} is already connected.` });
    } else {
      // If the league does not exist in our database, we need to start a leagueSync.
      // This will be implemented in the future steps.
      res.json({ message: `League with external ID ${externalLeagueId} is not connected. Starting league sync...` });
      // Start league sync...
      const newLeague = new LeagueSyncService({externalLeagueId, externalSystem})
      const newLeagueData = newLeague.fetchLeagueDataFromAPI();
      res.status(200).json(newLeagueData)
    }
  } catch (error) {
    res.status(500).send({ message: `Error: ${error.message}` });
  }
};
