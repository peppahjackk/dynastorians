const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueController");

router.get("/", leagueController.getAllLeagues);
router.get("/:id", leagueController.getLeagueById);
router.post("/user/external", leagueController.getExternalLeagues);
router.post("/sync", leagueController.syncLeague);
router.delete("/:id", leagueController.deleteLeague);

module.exports = router;
