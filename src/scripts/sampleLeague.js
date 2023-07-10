// Import the League model
const League = require('../models/league');

// Create a sample league object
const sampleLeague = new League({
  name: 'Theee My Fantasy League',
  participants: ['Player 1', 'Player 2', 'Player 3'],
  scoringSystem: 'PPR',
  externalLeagueId: '123456789',
  externalSystem: 'Fleaflicker'
});

// Save the league object to the database
sampleLeague.save()
  .then(() => {
    console.log('Sample league object created successfully');
  })
  .catch((error) => {
    console.error('Error creating sample league object:', error);
  });
