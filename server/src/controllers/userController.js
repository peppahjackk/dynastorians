const express = require("express");
const userService = require("../services/userService");
// const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await userService.createUser(userData);
    res.status(201).send(user);
  } catch (error) {
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

exports.getCurrentUser = async (req, res) => {
  try {
    const auth = await getAuth();

    res.status(200).send(auth.currentUser);
  } catch (error) {
    res.status(500).send({ message: `Error getting auth: ${error.message}` });
  }
};

// exports.signIn = async (req, res) => {};

// exports.signUp = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email == null || password == null) {
//       throw new Error(
//         `Insufficient signup parameters provided: email missing ${
//           email == null
//         }, password missing ${password == null}`,
//         );
//     }
    
//     const auth = await getAuth();
//     createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
//       const user = userCredential.user;

//       res.status(200).send(currentUser);

//     });
//   } catch (error) {
//     res.status(500).send({ message: `Error signing up: ${error.message}` });
//   }
// };
