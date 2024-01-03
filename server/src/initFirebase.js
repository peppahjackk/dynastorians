// firebase.js
const { initializeApp } = require("firebase/app");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dynastorians.firebaseapp.com",
  projectId: "dynastorians",
  storageBucket: "dynastorians.appspot.com",
  messagingSenderId: "614940800097",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

console.log("Initializing firebase...");
const firebase = initializeApp(firebaseConfig);

module.exports = firebase;