// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const { initializeApp } = require("firebase/app");
require('dotenv').config();
const leagueRoutes = require('./routes/leagueRoutes');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const rosterRoutes = require('./routes/rosterRoutes');
const matchRoutes = require('./routes/matchRoutes');

// Create an instance of Express
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/leagues', leagueRoutes);
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);
app.use('/rosters', rosterRoutes);
app.use('/matches', matchRoutes);

// Set up server to listen on a port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Replace `<db_connection_string>` with your actual MongoDB connection string
const dbConnectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dynastorians.firebaseapp.com",
  projectId: "dynastorians",
  storageBucket: "dynastorians.appspot.com",
  messagingSenderId: "614940800097",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


console.log("Initializing firebase...")
// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);