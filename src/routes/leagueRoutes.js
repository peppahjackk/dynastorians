const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueControllers");

router.get("/leagues", leagueController.getLeagueById);
router.get("/", leagueController.getAllLeagues);
router.get("/external", leagueController.getExternalLeagues);
router.post("/sync", leagueController.syncLeague);

// define more routes related to leagues...

module.exports = router;
