const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/", teamController.getTeams);
router.delete("/:id", teamController.delete);

module.exports = router;
