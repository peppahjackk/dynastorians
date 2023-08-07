const axios = require('axios'); // you may need to install this with npm install axios

class LeagueSyncService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://api.external-system.com', // replace with your actual API base URL
      timeout: 10000, // optional: sets a timeout of 10 seconds
    });
  }

  async fetchLeagueData(externalLeagueId) {
    try {
      const response = await this.apiClient.get(`/leagues/${externalLeagueId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch data for league ${externalLeagueId}: ${error}`);
      throw error;
    }
  }
}

module.exports = LeagueSyncService;