const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.get("/", matchController.getAllLeagues);
router.get("/:id", matchController.getLeagueById);

module.exports = router;
