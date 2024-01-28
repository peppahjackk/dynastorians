const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const leagueService = require("../services/leagueService");
const managerService = require("../services/managerService");
const teamService = require("../services/teamService");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const app = require("../initFirebase");

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == null || password == null) {
      throw new Error(
        `Insufficient signup parameters provided: email missing ${
          email == null
        }, password missing ${password == null}`,
      );
    }

    const auth = await getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = await userService.createUser({
      external_user_id: userCredential.user.uid,
      external_system: "firebase",
    });

    if (!user) throw new Error("User not found");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token, { httpOnly: true });

    res.status(201).send(user);
  } catch (error) {
    console.log('error', error)
    res.status(500).send({
      error: "An error occurred while creating the user" + error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving users" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user with leagues" });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUser({ id });
    if (user) {
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: `Error: ${error.message}` });
  }
};

exports.getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.getUserById(decoded.userId);

    if (!user) throw new Error("User not found");

    res.status(200).send(user);
  } catch (error) {
    res.status(401).send({ message: `Error: ${error.message}` });
  }
};

exports.getLeaguesByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const managers = await managerService.getManagerByUserId(userId);

    const leagueIds = await Promise.all(
      managers.map(async (manager) => {
        const teams = await teamService.getTeams({ manager_id: manager._id });
        return teams.map((team) => team.league_id);
      }),
    )

    const leagues = await Promise.all(
      leagueIds.flat().map(async (leagueId) => {
        const league = await leagueService.getLeagueById(leagueId);
        return league;
      }),
    );
    res.status(200).json(leagues);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user with leagues" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == null || password == null) {
      throw new Error(
        `Insufficient signup parameters provided: email missing ${
          email == null
        }, password missing ${password == null}`,
      );
    }

    const auth = await getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = await userService.getUserByExternalId({
      externalUserId: userCredential.user.uid,
      externalSystem: "firebase",
    });

    if (!user) throw new Error("User not found");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token, { httpOnly: true });

    res.status(200).send(user);
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      return res
        .status(401)
        .send({ message: "Error signing in: Incorrect email or password" });
    }
    res.status(500).send({ message: `Error signing in: ${error.message}` });
  }
};

exports.signOut = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).send({ message: "Signed out successfully" });
  } catch (error) {
    res.status(500).send({ message: `Error signing out: ${error.message}` });
  }
};
