// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const leagueRoutes = require("./routes/leagueRoutes");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const rosterRoutes = require("./routes/rosterRoutes");
const managerRoutes = require("./routes/managerRoutes");
const matchRoutes = require("./routes/matchRoutes");
const cookieParser = require("cookie-parser");

const firebase = require("./initFirebase");
console.log("Firebase initialized: ", firebase._options.projectId);

// Create an instance of Express
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/leagues", leagueRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);
app.use("/rosters", rosterRoutes);
app.use("/matches", matchRoutes);
app.use("/manager", managerRoutes);

// Set up server to listen on a port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Replace `<db_connection_string>` with your actual MongoDB connection string
const dbConnectionString = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
