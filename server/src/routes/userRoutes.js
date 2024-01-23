const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/me", userController.getMe)
router.get("/leagues/:id", userController.getLeaguesByUserId);
router.get("/:id", userController.getUserById);
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post('/signout', userController.signOut)
router.delete("/:id", userController.deleteUser);

module.exports = router;
