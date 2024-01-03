const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");

router.post("/", managerController.createManager);
router.get("/", managerController.getManagers);

module.exports = router;
