const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/current", userController.getCurrentUser)
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.post("/signin", userController.signIn);
router.delete("/:id", userController.deleteUser);

module.exports = router;
