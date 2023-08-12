
const express = require('express');
const router = express.Router();
const leagueSyncController = require('../controllers/leagueSyncController');

router.post('/connect', leagueSyncController.connectLeague);

// define more routes related to leagues...

module.exports = router;
