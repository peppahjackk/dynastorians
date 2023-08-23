const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueControllers");

router.get("/leagues", leagueController.getLeagueById);
router.get("/", leagueController.getAllLeagues);
router.get("/external", leagueController.getExternalLeagues);
router.post("/sync", leagueController.syncLeague);
router.delete("/:id", leagueController.deleteLeague);

// define more routes related to leagues...

module.exports = router;
