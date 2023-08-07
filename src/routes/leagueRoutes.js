const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagueControllers');

router.post('/connect', leagueController.connectLeague);
router.get('/leagues', leagueController.getLeagueById);
router.get('/', leagueController.getAllLeagues);
router.post('/', leagueController.createLeague);

// define more routes related to leagues...

module.exports = router;
