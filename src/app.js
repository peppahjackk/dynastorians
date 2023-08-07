// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const leagueRoutes = require('./routes/leagueRoutes');

// Create an instance of Express
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/leagues', leagueRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

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