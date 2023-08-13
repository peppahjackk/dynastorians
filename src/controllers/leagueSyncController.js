const LeagueSyncService = require('../services/leagueSyncService');
const leagueService = require('../services/leagueService')

exports.connectLeague = async (req, res) => {
  const { externalLeagueId, externalSystem = 'fleaflicker' } = req.body;
  try {
    const exists = await leagueService.checkLeagueExists(externalLeagueId);
    if (exists) {
      res.json({ message: `League with external ID ${externalLeagueId} is already connected.` });
    } else {
      // If the league does not exist in our database, we need to start a leagueSync.
      // This will be implemented in the future steps.
      
      // res.json({ message: `League with external ID ${externalLeagueId} is not connected. Starting league sync...` });
      // Start league sync...
      const newLeague = new LeagueSyncService({externalLeagueId, externalSystem})
      const newLeagueData = await newLeague.fetchLeagueDataFromAPI();
      res.status(201).send(newLeagueData)
    }
  } catch (error) {
    res.status(500).send({ message: `Error: ${error.message}` });
  }
};

